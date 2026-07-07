'use client';

import Drawbox from '@/app/about/components/Drawbox';
import { supabase } from '@/app/lib/supabase';
import { useParams } from 'next/navigation';
import React, { useRef, useState, useEffect, useCallback, MouseEvent, TouchEvent } from 'react';

const Sixtypes = () => {
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const drawCanvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const participantId = params?.id as string;

    const [img, setImg] = useState<HTMLImageElement | null>(null);
    const [aspectRatio, setAspectRatio] = useState(2);
    const [isErasing, setIsErasing] = useState(false);
    const [lineColor, setLineColor] = useState('#000000');
    const [eraserSize, setEraserSize] = useState(20);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

    const drawingRef = useRef(false);
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const nextPosRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const image = new Image();
        image.src = '/sixtypes.png';
        image.onload = () => {
            setImg(image);
            setAspectRatio(image.width / image.height);
        };
    }, []);

    const resizeCanvas = useCallback(() => {
        const container = containerRef.current;
        const bgCanvas = bgCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        if (!container || !bgCanvas || !drawCanvas || !img) return;

        const drawImage = new Image();
        drawImage.src = drawCanvas.toDataURL();

        const width = container.clientWidth;
        const height = width / aspectRatio;

        [bgCanvas, drawCanvas].forEach((canvas) => {
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = '100%';
            canvas.style.height = 'auto';
        });

        const bgCtx = bgCanvas.getContext('2d');
        if (bgCtx) {
            bgCtx.clearRect(0, 0, width, height);
            bgCtx.drawImage(img, 0, 0, width, height);
        }

        drawImage.onload = () => {
            const ctx = drawCanvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(drawImage, 0, 0, width, height);
            }
        };
    }, [img, aspectRatio]);

    useEffect(() => {
        if (!img) return;
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, [img, resizeCanvas]);

    const getPos = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>): { x: number; y: number } => {
        const canvas = drawCanvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        } else {
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }
    };

    const startDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        if ('touches' in e && e.touches.length > 1) return;
        e.preventDefault();
        drawingRef.current = true;
        lastPosRef.current = getPos(e);
    };

    // 여기서 오류 발생하던 부분, e 매개변수 타입 명확히 지정 (필수로 받고 처리)
    const endDrawing = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        drawingRef.current = false;
        lastPosRef.current = null;
        nextPosRef.current = null;
    };

    const updatePos = (e: MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>) => {
        if (!drawingRef.current) return;
        e.preventDefault();
        const pos = getPos(e);
        setCursorPos(pos);
        nextPosRef.current = pos;
    };

    useEffect(() => {
        const canvas = drawCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        const drawLoop = () => {
            if (drawingRef.current && lastPosRef.current && nextPosRef.current) {
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = isErasing ? eraserSize : 2;
                ctx.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : lineColor;
                ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';

                ctx.beginPath();
                ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
                ctx.lineTo(nextPosRef.current.x, nextPosRef.current.y);
                ctx.stroke();

                lastPosRef.current = nextPosRef.current;
            }
            requestAnimationFrame(drawLoop);
        };

        drawLoop();
    }, [isErasing, eraserSize, lineColor]);

    const handleClear = () => {
        const canvas = drawCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleSave = async () => {
        const bgCanvas = bgCanvasRef.current;
        const drawCanvas = drawCanvasRef.current;
        if (!bgCanvas || !drawCanvas) return;

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = bgCanvas.width;
        tempCanvas.height = bgCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        tempCtx.drawImage(bgCanvas, 0, 0);
        tempCtx.drawImage(drawCanvas, 0, 0);

        tempCanvas.toBlob(async (blob) => {
            if (!blob) return;

            const filename = `sixtypes-${Date.now()}.png`;
            const { error: uploadError } = await supabase.storage.from('sixtypes').upload(filename, blob, {
                contentType: 'image/png',
            });

            if (uploadError) {
                alert('업로드 실패: ' + uploadError.message);
                return;
            }

            const { data: urlData } = supabase.storage.from('sixtypes').getPublicUrl(filename);
            const imageUrl = urlData?.publicUrl;
            if (!imageUrl) {
                alert('URL 생성 실패');
                return;
            }

            const { error: insertError } = await supabase
                .from('sixtypes')
                .insert([{ participant_id: participantId, image_url: imageUrl }]);

            if (insertError) {
                alert('DB 저장 실패: ' + insertError.message);
            } else {
                alert('업로드 및 저장 성공!');
            }
        }, 'image/png');
    };

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '12px' }}>
            <Drawbox
                setIsErasing={setIsErasing}
                isErasing={isErasing}
                handleClear={handleClear}
                handleSave={handleSave}
                lineColor={lineColor}
                setLineColor={setLineColor}
                eraserSize={eraserSize}
                setEraserSize={setEraserSize}
            />

            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    position: 'relative',
                    aspectRatio: aspectRatio.toString(),
                    touchAction: 'none',
                    userSelect: 'none',
                }}
                onContextMenu={(e) => e.preventDefault()}
            >
                <canvas
                    ref={bgCanvasRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                />
                <canvas
                    ref={drawCanvasRef}
                    style={{
                        width: '100%',
                        height: 'auto',
                        border: '1px solid #ccc',
                        cursor: isErasing ? 'none' : 'crosshair',
                        position: 'relative',
                        zIndex: 1,
                        touchAction: 'none',
                        userSelect: 'none',
                    }}
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onMouseMove={updatePos}
                    onTouchStart={startDrawing}
                    onTouchEnd={endDrawing}
                    onTouchCancel={endDrawing}
                    onTouchMove={updatePos}
                />
                {isErasing && (
                    <div
                        style={{
                            position: 'absolute',
                            pointerEvents: 'none',
                            zIndex: 10,
                            left: cursorPos.x - eraserSize / 2,
                            top: cursorPos.y - eraserSize / 2,
                            width: eraserSize,
                            height: eraserSize,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            border: '1px solid #000',
                            boxSizing: 'border-box',
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Sixtypes;

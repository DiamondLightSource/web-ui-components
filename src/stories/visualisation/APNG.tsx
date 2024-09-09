import { Skeleton, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import parseAPNG, { APNG } from "apng-js";

export interface ApngProps {
  /* Current selected frame */
  frameIndex?: number;
  /* Callback function for frame count changes */
  onFrameCountChanged?: (frameCount: number) => void;
  /* Caption for the viewer */
  caption?: string;
  /* Image source URL */
  src: string;
}

export const APNGViewer = ({ src, onFrameCountChanged, frameIndex = 0, caption }: ApngProps) => {
  const [apng, setApng] = useState<APNG | null>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(src, { signal: abortController.signal })
      .then(async (response) => {
        if (response.status !== 200) {
          setApng(null);
          return;
        }

        const apng = parseAPNG(await response.arrayBuffer());
        if (apng instanceof Error) {
          setApng(null);
        } else {
          setApng(apng);
          if (apng.frames.length && onFrameCountChanged) {
            onFrameCountChanged(apng.frames.length);
          }
        }
      })
      .catch((err) => console.log("Interrupted fetch: ", err));

    return () => {
      // Cancel loading the APNG when page changes before it is fully loaded
      abortController.abort();
    };
  }, [src, onFrameCountChanged]);

  useEffect(() => {
    if (apng && frameIndex < apng.frames.length && frameIndex >= 0) {
      const frame = apng.frames[frameIndex];
      if (frame.imageData !== null && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          if (frame.disposeOp === 1) {
            // Do not overlay frames
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
          createImageBitmap(frame.imageData).then((imageBitmap) => {
            context.drawImage(imageBitmap, frame.left, frame.top);
          });
        }
      }
    }
  }, [apng, frameIndex]);

  return (
    <VStack h='100%' w='100%' spacing='0' bg='diamond.100'>
      {apng ? (
        <canvas
          aria-label='Frame Image'
          width={apng ? apng.width : 0}
          height={apng ? apng.height : 0}
          ref={canvasRef}
        />
      ) : apng === null ? (
        <Heading alignItems='center' display='flex' h='100%' variant='notFound'>
          No Image Data Available
        </Heading>
      ) : (
        <Skeleton h='100%' w='100%' />
      )}
      {caption && (
        <Heading py={2} textAlign='center' w='100%' bg='diamond.75' size='sm'>
          {caption}
        </Heading>
      )}
    </VStack>
  );
};

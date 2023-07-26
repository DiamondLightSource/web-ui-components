import { Image, Skeleton, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import parseAPNG, { Frame } from "apng-js";

export interface ApngProps {
  /* Current selected frame */
  frameIndex?: number;
  /* Callback function for frame count changes */
  onFrameCountChanged?: (frameCount: number) => void;
  /* Caption for the viewer */
  caption?: string;
  /* Image source URL */
  src: string;
  /* Play APNG file directly, ignore external controls */
  autoplay?: boolean;
}

export const APNGViewer = ({
  src,
  onFrameCountChanged,
  frameIndex = 0,
  caption,
  autoplay = false,
}: ApngProps) => {
  const [frames, setFrames] = useState<Frame[] | null>();
  const [currentFrame, setCurrentFrame] = useState<string>();

  useEffect(() => {
    const abortController = new AbortController();
    if (autoplay) {
      return;
    }

    setCurrentFrame(undefined);
    fetch(src, { signal: abortController.signal })
      .then(async (response) => {
        if (response.status !== 200) {
          setFrames(null);
          return;
        }

        const apng = parseAPNG(await response.arrayBuffer());
        if (apng instanceof Error) {
          setFrames(null);
        } else {
          setFrames(apng.frames);
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
  }, [src, onFrameCountChanged, autoplay]);

  useEffect(() => {
    if (frames && frameIndex < frames.length && frameIndex >= 0) {
      const frame = frames[frameIndex];
      if (frame.imageData !== null) {
        setCurrentFrame(URL.createObjectURL(frame.imageData));
      }
    }
  }, [frames, frameIndex]);

  return (
    <VStack h='100%' w='100%' spacing='0' bg='diamond.100'>
      {currentFrame || autoplay ? (
        <Image
          alt={caption || "APNG Image"}
          aria-label='Frame Image'
          objectFit='contain'
          maxW='100%'
          h='100%'
          src={autoplay ? src : currentFrame}
        />
      ) : frames === null ? (
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

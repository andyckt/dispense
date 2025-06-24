"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Camera, Upload, X, RefreshCw, Check, Tablet, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

type AnalysisState = "idle" | "capturing" | "processing" | "results"

interface TabletAnalysisResult {
  count: string
  error?: string
}

export default function TabletAnalysisDemo() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<TabletAnalysisResult | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check if camera is supported
  const isCameraSupported = typeof navigator !== 'undefined' && 
                           navigator.mediaDevices && 
                           navigator.mediaDevices.getUserMedia;

  // Define startProcessing function first to avoid reference errors
  const startProcessing = useCallback(async (dataUrl: string, file?: File) => {
    setAnalysisState("processing")
    setProgress(0)
    setError(null)
    
    // Start progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return 95
        }
        return prev + Math.random() * 10
      })
    }, 300)
    
    try {
      // Create FormData and append the image
      const formData = new FormData()
      
      // If file is provided, use it directly
      if (file) {
        formData.append('image', file)
      } 
      // Otherwise convert dataUrl to a file
      else if (dataUrl) {
        // Convert data URL to Blob
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        formData.append('image', blob, 'image.jpg')
      }
      
      // Call our API endpoint
      const response = await fetch('/api/count-tablets', {
        method: 'POST',
        body: formData
      })
      
      const data = await response.json()
      
      clearInterval(progressInterval)
      setProgress(100)
      
      if (data.error) {
        setError(data.error)
        setResult(null)
      } else {
        setResult(data)
        setError(null)
      }
      
      setTimeout(() => {
        setAnalysisState("results")
      }, 500)
      
    } catch (err) {
      clearInterval(progressInterval)
      setProgress(100)
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error occurred'}`);
      setResult(null)
      
      setTimeout(() => {
        setAnalysisState("results")
      }, 500)
    }
  }, [])

  const stopCamera = useCallback(() => {
    console.log("Stopping camera...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log("Stopping track:", track);
        track.stop();
      });
      streamRef.current = null;
    }
    setIsCameraReady(false);
  }, []);

  const captureImage = useCallback(() => {
    if (!videoRef.current) {
      console.error("Video reference not available for capture");
      return;
    }
    
    if (videoRef.current.readyState !== 4) {
      console.warn("Video not fully ready for capture, readyState:", videoRef.current.readyState);
    }
    
    try {
      console.log("Capturing image from video...");
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      console.log("Canvas dimensions:", canvas.width, "x", canvas.height);
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        console.log("Image captured successfully");
        setImageSrc(dataUrl);
        stopCamera();
        startProcessing(dataUrl);
      } else {
        console.error("Could not get canvas context");
      }
    } catch (err) {
      console.error("Error capturing image:", err);
      setCameraError("Failed to capture image. Please try again.");
    }
  }, [stopCamera, startProcessing]);

  const startCamera = useCallback(async () => {
    // Reset any previous camera errors
    setCameraError(null);
    setIsCameraReady(false);
    
    if (!isCameraSupported) {
      setCameraError("Camera access is not supported in your browser.");
      return;
    }
    
    try {
      console.log("Requesting camera access...");
      const constraints = { 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log("Camera access granted:", stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setAnalysisState("capturing");
        
        // Log video element state
        console.log("Video element:", videoRef.current);
        console.log("Video ready state:", videoRef.current.readyState);
      } else {
        console.error("Video reference is not available");
        setCameraError("Could not initialize camera. Please try again.");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError(
        err instanceof Error 
          ? `Camera error: ${err.message}` 
          : "Unable to access camera. Please ensure you've granted camera permissions."
      );
    }
  }, [isCameraSupported]);

  // Handle video element events
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleCanPlay = () => {
      console.log("Video can play now");
      setIsCameraReady(true);
    };
    
    const handleError = (e: Event) => {
      console.error("Video element error:", e);
      setCameraError("Error initializing video stream");
    };
    
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    
    return () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
    };
  }, [analysisState]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setImageSrc(dataUrl)
        startProcessing(dataUrl, file)
      }
      reader.readAsDataURL(file)
    }
  }, [startProcessing])

  const resetDemo = useCallback(() => {
    setAnalysisState("idle")
    setProgress(0)
    setResult(null)
    setImageSrc(null)
    setError(null)
    setCameraError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="flex items-center justify-center gap-2">
          <Tablet className="h-6 w-6" />
          <span>Tablet Analysis Demo</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-[4/3] bg-gray-100 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {analysisState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-6"
              >
                <div className="mb-6 text-gray-500">Take a photo or upload an image of tablets to analyze</div>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={startCamera} 
                    className="flex items-center gap-2"
                    disabled={!isCameraSupported}
                  >
                    <Camera className="h-4 w-4" />
                    <span>Camera</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                {!isCameraSupported && (
                  <div className="mt-4 text-sm text-amber-600">
                    <AlertCircle className="h-4 w-4 inline mr-1" />
                    Camera not supported in this browser. Please use the upload option.
                  </div>
                )}
              </motion.div>
            )}

            {analysisState === "capturing" && (
              <motion.div
                key="capturing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  onCanPlay={() => setIsCameraReady(true)}
                  className="w-full h-full object-cover" 
                />
                
                {cameraError && (
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white p-6">
                    <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-4">Camera Error</h3>
                    <p className="text-center mb-6">{cameraError}</p>
                    <Button
                      onClick={resetDemo}
                      variant="outline"
                      className="bg-white text-gray-900"
                    >
                      Go Back
                    </Button>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  <Button
                    onClick={captureImage}
                    className="rounded-full w-14 h-14 p-0 flex items-center justify-center"
                    disabled={!isCameraReady}
                  >
                    <Camera className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      stopCamera()
                      resetDemo()
                    }}
                    className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-white"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {!cameraError && !isCameraReady && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-white animate-spin mb-2" />
                    <p className="text-white">Initializing camera...</p>
                  </div>
                )}
              </motion.div>
            )}

            {(analysisState === "processing" || analysisState === "results") && imageSrc && (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full relative"
              >
                <img src={imageSrc || ""} alt="Captured tablet" className="w-full h-full object-cover" />

                {analysisState === "processing" && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
                    <RefreshCw className="h-10 w-10 animate-spin mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analyzing Tablets</h3>
                    <div className="w-full max-w-xs mb-2">
                      <Progress value={progress} className="h-2" />
                    </div>
                    <div className="text-sm opacity-80">
                      {progress < 30 && "Detecting tablets..."}
                      {progress >= 30 && progress < 60 && "Analyzing physical properties..."}
                      {progress >= 60 && progress < 90 && "Counting tablets..."}
                      {progress >= 90 && "Finalizing results..."}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {analysisState === "results" && imageSrc && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-white/90 overflow-y-auto"
              >
                <div className="p-6">
                  {error ? (
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-red-600">Analysis Error</h3>
                      <p className="text-gray-600 mt-2">{error}</p>
                    </div>
                  ) : result ? (
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-blue-600">Analysis Complete</h3>
                      <div className="mt-6 mb-6 bg-blue-50 rounded-lg p-8 flex flex-col items-center">
                        <div className="text-4xl font-bold text-blue-700 mb-2">{result.count}</div>
                        <div className="text-gray-600">Tablets Detected</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-blue-600">Analysis Complete</h3>
                      <p className="text-gray-600 mt-2">
                        No results available.
                      </p>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold mb-1">How It Works</h4>
                    <p className="text-sm">
                      Our system uses AI vision technology to analyze the image and count the number of tablets.
                      This helps pharmacists quickly verify medication counts.
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 italic text-center mb-4">
                    For demonstration purposes. Results may vary based on image quality and lighting conditions.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between p-4 bg-gray-50">
        {analysisState === "results" ? (
          <Button onClick={resetDemo} className="w-full">
            Analyze Another Sample
          </Button>
        ) : (
          <div className="text-sm text-gray-500 text-center w-full">
            {analysisState === "processing"
              ? "Please wait while we analyze the image..."
              : "This demo uses AI to count tablets in your images"}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

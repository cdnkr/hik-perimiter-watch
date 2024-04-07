import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import { loadPlayer } from "rtsp-relay/browser";

import { captureClasses } from "config";
import { isTimeInRange } from "../utils/datetime-helpers";

const useObjectDetection = (camera, canvasRef, objectBboxRef, setFeed, setShow) => {
    const intervalRef = useRef();

    const [model, setModel] = useState(null);

    const initialize = useCallback(async () => {
        setShow(false);
        
        const loadedModel = await cocoSsd.load();

        setModel(loadedModel);
        setFeed(feed => [...feed, { text: "Object detection loaded", color: "green" }]);

        setShow(true);
        await loadPlayer({
            url: `ws://${process.env.REACT_APP_API_URL}/stream/${camera}`,
            canvas: canvasRef.current,
            onDisconnect: () => setFeed(feed => [...feed, { text: "Connection lost", color: "red" }]),
        });

    }, [setModel, setFeed, camera, canvasRef, setShow]);

    useEffect(() => {
        initialize();

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [intervalRef, initialize]);

    const saveCapture = useCallback(async (obj) => {
        try {
            await axios.post(`http://${process.env.REACT_APP_API_URL}/capture/${camera}`, obj);
        } catch (err) {
            console.log(`Failed to save capture on camera ${camera}`, err)
        }
    }, []);

    function drawRect(bbox) {
        const canvasWidth = canvasRef.current.clientWidth;

        const adjustmentFactor = parseFloat(canvasWidth) / 1280;

        const adjustedBbox = bbox.map(v => v * adjustmentFactor);

        const [top, right, bottom, left] = adjustedBbox;

        const width = right - left;
        const height = bottom - top;

        objectBboxRef.current.style = `position: absolute; top: ${top}px; left: ${left}px; width: ${width}px; height: ${height}px; border: 1px solid red;`
    }

    useEffect(() => {
        if (!model || !camera) return;

        const detectObjects = async () => {
            if (!canvasRef.current) return;

            setFeed(feed => {
                if (!feed.find(f => f.id === "load")) {
                    return [...feed, {
                        id: "load",
                        text: `Streaming from camera ${camera}`,
                        color: "green"
                    }];
                } else {
                    return feed;
                }
            });

            const predictions = await model.detect(canvasRef.current);
            predictions.forEach(prediction => {
                setFeed(feed => [...feed, {
                    text: `${prediction.class} detected with ${(prediction.score.toFixed(2)) * 100}% probability`,
                    color: "blue"
                }]);

                captureClasses.forEach(c => {
                    if (
                            (prediction.score > c.minProbability) && 
                            (prediction.class === c.name) &&
                            isTimeInRange(c.hours)
                        ) {
                        drawRect(prediction.bbox);
                        saveCapture({
                            class: prediction.class,
                            probability: prediction.score,
                            camera: camera
                        });
                    }
                });
            });
        };

        intervalRef.current = setInterval(detectObjects, 1000);

        return () => clearInterval(intervalRef.current);
    }, [model, camera, canvasRef, intervalRef, setFeed, saveCapture]);
};

export default useObjectDetection;
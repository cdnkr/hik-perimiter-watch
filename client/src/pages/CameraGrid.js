import { cameraIndexes } from "config";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadPlayer } from "rtsp-relay/browser";

export default function CameraGrid() {
    useEffect(() => {
        cameraIndexes.forEach((cameraIndex) => {
            loadPlayer({
                url: `ws://${process.env.REACT_APP_API_URL}/stream/${cameraIndex}`,
                canvas: document.getElementById(`canvas-${cameraIndex}`)
            });
        });
    }, []);

    return (
        <div className="camera-container">
            {cameraIndexes.map((cameraIndex, i) => (
                <Link to={`/${cameraIndex}`}>
                    <canvas 
                        key={i}
                        id={`canvas-${cameraIndex}`}
                    />
                </Link>
            ))}
        </div>
    )
}

import { format } from "date-fns";
import useObjectDetection from "hooks/useObjectDetection";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewCamera() {
    const { camera } = useParams();
    const [show, setShow] = useState(true);
    const [feed, setFeed] = useState([]);

    const canvasRef = useRef();
    const objectBboxRef = useRef();

    useObjectDetection(camera, canvasRef, objectBboxRef, setFeed, setShow);

    return (
        <div className="view-camera w-full flex items-center justify-center">
            <div className="w-full max-w-6xl">
                <div className="h-10" />
                <h1 className="text-xl font-bold text-white">Camera {camera}</h1>
                <div className="h-5" />
                <div className="w-full grid gap-5 grid-cols-3">
                    <div className="col-span-2">
                        {show ? (
                            <div className="w-full relative canvas-container">
                                <canvas 
                                    ref={canvasRef}
                                    className="w-full h-auto rounded-xl shadow-xl ar-16/9" 
                                />
                                <div ref={objectBboxRef} />
                            </div>
                        ) : <div className="w-full h-auto rounded-xl shadow-xl ar-16/9 bg-black" />}
                    </div>
                    <div className="col-span-1">
                        {feed && Array.isArray(feed) && feed.length > 0 && <div className="w-full h-auto">
                            {feed.slice(feed.length - 6, feed.length).map((f, i) => (
                                <div key={i} className={`bg-transparent rounded-xl w-full h-16 mb-2 p-4 flex items-center`}>
                                    <div>
                                        <h2 className={`text-md font-bold text-${f.color}-500`}>{f.text}</h2>
                                        <p className={`text-md text-${f.color}-500`}>{format(new Date(), "yyyy-MM-dd HH:mm:ss")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
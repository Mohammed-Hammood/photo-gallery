import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }): JSX.Element | null {
    const [container, setContainer] = useState<null | HTMLDivElement>(null);

    useEffect(() => {

        const el = document.createElement("div");
        
        el.setAttribute("class", "modal");

        document.body.appendChild(el);

        document.body.style.overflow = "hidden";

        setContainer(el);

        return () => {
           
            document.body.style.overflow = "auto";

            setContainer(null);

            document.body.removeChild(el);
        }

    }, []);

    return container ? createPortal(children, container) : null;
}
// ScrollToTop.tsx
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export default function ScrollToTop() {
    const {pathname} = useLocation();


    useEffect(() => {
        setTimeout(() => {
            console.log("Scrolling to top...");
            window.scrollTo(0, 0);
        }, 200);
    }, [pathname]);

    return null;
}

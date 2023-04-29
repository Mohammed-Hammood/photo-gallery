import App from "./app/App";
import useFetch from "./hooks/useFetch";
import Header from "./layouts/header";
import ScrollToTop from "./layouts/scroll-to-top";
import ProgressBar from "./layouts/progressbar";
import Modal from "./modal";
import SVG from "./shared/svg";
import InputElement from "./elements/input-element";
import ImageMagnifier  from './shared/images-magnifier';
import Loader from './shared/loader';
import Pagination from './shared/pagination';
import InputRangeElement from './elements/input-range-element';
import ColorsOptions from "./shared/colors-options";
import BackgroundColorsOptions from "./shared/background-colors-options";
import TextareaElement from "./elements/textarea-element";
import HelmetElement from "./shared/helmet";
import Footer from "./layouts/footer";
import Filters from "./layouts/filters";

export {
    App,
    BackgroundColorsOptions,
    ColorsOptions,
    InputRangeElement,
    Filters,
    useFetch,
    TextareaElement,
    InputElement,
    ImageMagnifier,
    Modal,
    Loader,
    Header,
    Footer,
    Pagination,
    ScrollToTop,
    SVG,
    ProgressBar,
    HelmetElement,
}
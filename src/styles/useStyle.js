import {default as playground} from './stPlayground';

const selectStyle = (style) => {
    return style
};

const styles = {
    playground,
};

const useStyle = selectStyle((style) => (styles));

export const classes = useStyle();
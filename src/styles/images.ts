import styled from "styled-components";

export const ImagesWrapper = styled.main`


    .control_panel__wrapper {
        max-width:900px;
        width: 100%;
        margin: auto;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction: column;
        gap:10px;
    }

    .images__wrapper {
        width: 100%;
        display:flex;
        justify-content:center;
        align-items:center;
        gap: 5px;
        flex-direction: row;
        flex-wrap: wrap;

        .image:hover {
            box-shadow: 0 0 10px var(--specialColor1);

            img {
                outline: 1px solid black;
                transform: scale(1.2);
                transition: 1s;
                z-index: 2;
                cursor: zoom-in;
            }
        }

        .image {
            height: 200px;

            img {
                height: 100%;
                width: auto;
            }
        }
}

@media screen and (max-width:750px) {
    & .images__wrapper .image {
        height: 100%;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
`
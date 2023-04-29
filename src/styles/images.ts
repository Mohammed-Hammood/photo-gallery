import styled from "styled-components";

export const ImagesWrapper = styled.main`
    display:flex;
    justify-content: center;
    flex-direction:row;
    gap:10px;
    .left-content, .right-content {
        display: flex;
        justify-content: center;
        width:100%;
        height:100%;
        max-width: 500px;
        flex: 1 1 40%;
        position: -webkit-sticky;
        top: 50px;
        min-width: 250px;
    }
    .center-content {
        display:flex;
        justify-content: center;
        flex-direction: column;
        gap:10px;
        max-width: 1400px;

        .images__wrapper {
            width: 100%;
            display:flex;
            justify-content:center;
            align-items:center;
            gap: 5px;
            flex-direction: row;
            flex-wrap: wrap;

            .image:hover {
                img {
                    backdrop-filter: blur(100px);
                    box-shadow: 0 0 30px var(--specialColor1);
                    outline: 1px solid white;
                    transform: scale(1.2);
                    transition: 1s;
                    z-index: 2;
                    cursor: zoom-in;
                }
            }
            
            .image {
                height: 200px;
                
                img {
                    max-width: 650px;
                    height: 100%;
                    width: auto;
                }
            }
        }
}
@media screen and (max-width:1050px) {
    flex-direction: column;
    .right-content, .left-content, .center-content {
        max-width: 100%;
        #filters_direction_section {
            display:none;
        }
    }
}
    @media screen and (max-width:750px) {
        & .center-content .images__wrapper .image {
            height: 100%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
`
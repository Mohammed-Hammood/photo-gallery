// import React from "react";
// import styled from "styled-components";
// import { useAuthentication } from "hooks";

// import {
//     FacebookShareButton,
//     TwitterShareButton,
//     VKShareButton,
//     LinkedinShareButton,
//     WhatsappShareButton,
//     TelegramShareButton,
//     InstapaperShareButton,
//     EmailShareButton,

// } from 'react-share';
// import { InputElement, SVG } from "components";
// import { useTranslation } from "react-i18next";
// import { ShareLinkTypes } from "libs/types";
// import { Button } from "styles/styled-components/buttons";


// const Wrapper = styled.div`
//     width:100%;
//     height:100%;
//     top:0;
//     left:0;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     .section  {
//         width:100%;
//         background:white;
//         padding:10px;
//         border-radius:10px;
//         border:1px solid var(---specialColor2);
//         max-width: 1000px;
//         display: flex;
//         gap:10px;
//         align-items:center;

//         .image__wrapper {
//             width: 100%;;
//             height: 100%;
//             max-height:200px;
//             max-width:360px;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             img {
//                 width:100%;
//                 max-height: 200px;
//                 object-fit: contain;
//             }
//         }
//     }
// `
// interface Props {
//     IsVisible: boolean;
//     setIsVisible: (value: boolean) => void;
//     item: ShareLinkTypes['item'];
// }
// export default function SocialShareForm(props: Props) {
//     const { item } = props;
//     const { t:t_ } = useTranslation('translation');
//     const t = (text:string):string => t_(text)
//     const { isAdmin } = useAuthentication({});
//     const image: string = (item && item.image) ? (typeof item.image !== 'string' ? item.image.cdn : item.image) : "";
//     const url = window.location.origin + (item ? item.path : '');
//     if (!item) return null;
//     return (
//         <Wrapper>
//             {item.image ?
//                 <div className="section">
//                     <div className="image__wrapper">
//                         <img src={image} alt={""} />
//                     </div>
//                 </div>
//                 : null}
//             <div className="section">
//                 <span>{t("Link")}</span>
//                 <InputElement value={url} counter={false} clearButton={false} onFocus={() => navigator.clipboard.writeText(url)} />
//                 <Button type="button" onClick={() => navigator.clipboard.writeText(url)}
//                     $colorOnHover="white"
//                     $color='white'>

//                     {t("Copy")}
//                 </Button>
//             </div>

//             <div className="section">
//                 <span>{t("Telegram")}</span>
//                 <TelegramShareButton url={url} title={t(item.title)} >
//                     <SVG name='telegram-brands' color='blue' />
//                 </TelegramShareButton>
//             </div>
//             <div className="section">
//                 <span>{t("VK")}</span>
//                 <VKShareButton url={url} image={image} title={t(item.title)}>
//                     <SVG name='vk-brands' color='blue' />
//                 </VKShareButton>
//             </div>
//             {isAdmin && (false) ? <>
//                 <div className="section">
//                     <span>{t("Email")}</span>
//                     <EmailShareButton
//                         body={`${t("World Of Technology")} - ${t(item.title)} \n ${url}`}
//                         separator={`${t("World Of Technology")} - ${t(item.title)} \n ${url}`}
//                         subject={`${t("World Of Technology")} - ${t(item.title)}`}
//                         url={url}
//                         title={item.title}
//                     >
//                         <SVG name='envolope' color='black' />
//                     </EmailShareButton>
//                 </div>
//                 <div className="section">
//                     <span>{t("Facebook")}</span>
//                     <FacebookShareButton url={url} title={t(item.title)}>
//                         <SVG name='facebook-brands' color='blue' />
//                     </FacebookShareButton>
//                 </div>
//                 <div className="section">
//                     <span>{t("Whatsapp")}</span>
//                     <WhatsappShareButton url={url} title={t(item.title)}>
//                         <SVG name='whatsapp-brands' color='green' />
//                     </WhatsappShareButton>
//                 </div>
//                 <div className="section">
//                     <span>{t("Linkedin")}</span>
//                     <LinkedinShareButton source={url} url={url} title={t(item.title)}>
//                         <SVG name='linkedin-brands' color='blue' />
//                     </LinkedinShareButton>
//                 </div>
//                 <div className="section">
//                     <span>{t("Instagram")}</span>
//                     <InstapaperShareButton url={url} title={t(item.title)}>
//                         <SVG name='instagram-brands' color='blue' />
//                     </InstapaperShareButton>
//                 </div>
//                 <div className="section">
//                     <span>{t("Twitter")}</span>
//                     <TwitterShareButton url={url} title={t(item.title)}>
//                         <SVG name='twitter-brands' color='lightblue' />
//                     </TwitterShareButton>
//                 </div>
//             </> : null}

//         </Wrapper>
//     )
// }

export default function Fun(){} 
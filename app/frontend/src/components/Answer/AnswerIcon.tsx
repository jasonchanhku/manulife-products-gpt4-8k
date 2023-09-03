import { Sparkle28Filled } from "@fluentui/react-icons";
import MyImg from "../../assets/manulife.png";

import styles from "../../pages/chat/Chat.module.css";

export const AnswerIcon = () => {
    // return <Sparkle28Filled primaryFill={"rgba(115, 118, 225, 1)"} aria-hidden="true" aria-label="Answer logo" />;
    
    return <img src={MyImg} alt="Chat logo" className={styles.chatLogoManuSmall}/>
};

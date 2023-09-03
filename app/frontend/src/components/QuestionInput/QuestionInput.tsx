import { useState, useEffect } from "react";
import { Stack, TextField } from "@fluentui/react";
import { Send32Filled, MicPulse32Filled, MicPulseOff32Filled } from "@fluentui/react-icons";
import { WhisperSTT } from "whisper-speech-to-text";

import styles from "./QuestionInput.module.css";

// Load environment variables from .env file
// import dotenv from "dotenv";
// dotenv.config();
// Use the OPEN_AI_API_KEY from the .env file
// const whisper = new WhisperSTT(process.env.OPEN_AI_API_KEY as string);

const whisper = new WhisperSTT("YOUR_API_KEY");

interface Props {
    onSend: (question: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend }: Props) => {
    const [question, setQuestion] = useState<string>("");
    const [isFromTranscription, setIsFromTranscription] = useState(false);

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        onSend(question);

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const startRecord = async () => {
        // Start recording
        await whisper.startRecording();
    };

    const stopRecord = async () => {
        await whisper.stopRecording(text => {
            setQuestion(text);
            setIsFromTranscription(true);
        });
    };

    useEffect(() => {
        if (question.trim() && isFromTranscription) {
            onSend(question);
            setIsFromTranscription(false); // Reset the flag
        }
    }, [question, isFromTranscription]);

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setQuestion("");
        } else if (newValue.length <= 1000) {
            setQuestion(newValue);
        }
    };

    const sendQuestionDisabled = disabled || !question.trim();

    return (
        <Stack horizontal className={styles.questionInputContainer}>
            <TextField
                className={styles.questionInputTextArea}
                placeholder={placeholder}
                multiline
                resizable={false}
                borderless
                value={question}
                onChange={onQuestionChange}
                onKeyDown={onEnterPress}
            />
            <div className={styles.questionInputButtonsContainer}>
                <div className={styles.questionInputSendButton} aria-label="Record Audio" onClick={startRecord} style={{ paddingRight: "28px"}}>
                    <MicPulse32Filled primaryFill="rgba(0, 167, 88, 1)"/>
                </div>
            </div>
            <div className={styles.questionInputButtonsContainer}>
                <div className={styles.questionInputSendButton} aria-label="Stop Record Audio" onClick={stopRecord} style={{ paddingRight: "28px"}}>
                    <MicPulseOff32Filled primaryFill="rgba(0, 167, 88, 1)" />
                </div>
            </div>
            <div className={styles.questionInputButtonsContainer}>
                <div
                    className={`${styles.questionInputSendButton} ${sendQuestionDisabled ? styles.questionInputSendButtonDisabled : ""}`}
                    aria-label="Ask question button"
                    onClick={sendQuestion}
                >
                    <Send32Filled primaryFill="rgba(0, 167, 88, 1)" />
                </div>
            </div>
        </Stack>
    );
};

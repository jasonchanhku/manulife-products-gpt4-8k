import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "What can you tell me about Manulife Bright Care Pro?",
        value: "What can you tell me about Manulife Bright Care Pro?"
    },
    { text: "Summarise 5 key benefits of ManuCentury.", value: "Summarise 5 key benefits of ManuCentury." },
    { text: "Recommend an investment product for a 30 years old office worker.", value: "Recommend an investment product for a 30 years old office worker." }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};

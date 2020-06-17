import React from 'react';
import { Card } from 'semantic-ui-react';

const TranscriptionCard = ({ transcriptionInfo, displayTranscription }) => {
    const onCardClick = () => {
        displayTranscription(transcriptionInfo);
    };

    return (
        <Card
            link
            header={transcriptionInfo.topic}
            meta={transcriptionInfo.date}
            description={transcriptionInfo.messages[0].text}
            extra={
                transcriptionInfo.reviewed ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                        Revisado por Profesor
                    </span>
                ) : (
                    'Pendiente de Revisión'
                )
            }
            onClick={onCardClick}
        />
    );
};

export default TranscriptionCard;

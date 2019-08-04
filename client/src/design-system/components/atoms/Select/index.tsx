import React from 'react';
import uuidv1 from 'uuid/v1';

import Container from './Container';

type Option = {
    text: string,
    value?: string
};

interface ISelectProps {
    id?: string,
    options: Option[],
    onChange: any,
    value: string
}

const Select: React.FC<ISelectProps> = ({options, ...rest}) => (
    <Container {...rest}>
        {options.map(({text, value}) => {
            const key: string = uuidv1();
            return (
                <option
                    key={key} 
                    value={value || text}>
                    {text}
                </option>
            );    
        })}
    </Container>
);

export default Select;
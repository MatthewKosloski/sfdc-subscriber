import React from 'react';

import { Titles } from '../../../../../design-system/components';

import Container from './Container';
import Timestamp from './Timestamp';

interface IEventLogItemProps {};

const EventLogItem: React.FC<IEventLogItemProps> = () => (
    <Container>
        <Timestamp style={{borderColor: 'rgba(43, 46, 106, 1)'}}>21:21:50</Timestamp>
        <Titles 
            titleAs="h3"
            titleText="Product_License_Expiration__e"
            subtitleText="The product license 45xlvk46hf, for product Doris, belonging to client SJobs02, has expired." />
    </Container>
);

export default EventLogItem;
import React from 'react';

import Sidebar from '../Sidebar';

import Header from './Header';
import EventLog from './EventLog';

interface IEventLogSidebarProps {};

const EventLogSidebar: React.FC<IEventLogSidebarProps> = () => (
    <Sidebar headerComponent={<Header />}>
        <EventLog />
    </Sidebar>
);

export default EventLogSidebar;
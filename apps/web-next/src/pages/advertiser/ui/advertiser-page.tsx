"use client";

import React, { useState } from "react";
import { MOCK_CAMPAIGNS } from "../model/mock-data";
import styles from "./advertiser-page.module.scss";
import { CampaignsList } from "./campaigns-list/campaigns-list";
import { CampaignDetails } from "./campaign-details/campaign-details";

export const AdvertiserPage = () => {
    const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
    const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
        campaigns.length > 0 ? campaigns[0].id : null
    );
    
    const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId);

    return (
        <>
            <CampaignsList 
                campaigns={campaigns} 
                selectedCampaignId={selectedCampaignId} 
                onSelect={setSelectedCampaignId} 
            />

            {selectedCampaign && (
                <CampaignDetails campaign={selectedCampaign} />
            )}
        </>
    );
};

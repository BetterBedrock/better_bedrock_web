"use client";

import { useState } from "react";
import { BedrockText } from "@/shared/ui/bedrock-text";
import { Button } from "@/shared/ui/button";
import { MOCK_CAMPAIGNS, MockAdCampaign } from "@/pages/advertiser/model/mock-data";
import styles from "./hero-ads.module.scss";

import { AdsNavigation } from "./ads-navigation/ads-navigation";
import { AdsList } from "./ads-list/ads-list";

type TabType = "PENDING" | "ACTIVE" | "REJECTED";

export const HeroAds = () => {
    const [campaigns, setCampaigns] = useState<MockAdCampaign[]>(MOCK_CAMPAIGNS);
    const [activeTab, setActiveTab] = useState<TabType>("PENDING");

    const pendingCampaigns = campaigns.filter((c) => c.status === "PENDING");
    const activeCampaigns = campaigns.filter((c) => c.status === "ACTIVE");
    const rejectedCampaigns = campaigns.filter((c) => c.status === "REJECTED");

    const handleAccept = async (id: string) => {
        setCampaigns((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: "ACTIVE" as const } : c))
        );
    };

    const handleRejectClick = (id: string) => {
        // TODO: Open global Modal/Popup for REJECT. 
        // Required modal fields: Textarea for rejection reason.
        // On confirm, trigger e.g. handleRejectConfirm(reason, id).
        console.log("Reject popup triggered for:", id);
    };

    const handleRejectConfirm = (reason: string, campaignId: string) => {
        // TODO: Call backend API to update campaign status to REJECTED and save the rejection reason.
        setCampaigns((prev) =>
            prev.map((c) =>
                c.id === campaignId ? { ...c, status: "REJECTED" as const, rejectionReason: reason } : c
            )
        );
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this campaign?")) return;
        // TODO: Call backend API endpoint to DELETE the campaign from the database.
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
    };

    const handleOpenAddModal = () => {
        // TODO: Add Popup component here.
        // Required fields: User ID, Plan (Select: EXCLUSIVE, STANDARD, BASIC), Image URL, Target URL, Expires At.
        // Backend / Data flow requirements:
        // 1. Create an API endpoint (e.g. POST /api/campaigns) to handle the creation.
        // 2. Validate form data: check if user exists, validate URLs (Image, Target), verify plan type.
        // 3. After successful API response, update the `campaigns` state locally or re-fetch from the server.
        console.log("Add Campaign Modal triggered");
    };

    const handleOpenEditModal = (campaign: MockAdCampaign) => {
        // TODO: Open global Modal/Popup for EDITING an existing campaign.
        // Required fields same as Add, but pre-filled with current campaign data.
        // On confirm, update the state array.
        console.log("Edit Campaign Modal triggered for:", campaign.id);
    };

    return (
        <>
            <AdsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <Button type="green" width="100%" onClick={handleOpenAddModal} center>
                <BedrockText color="white" type="p" text="Create Ad" />
            </Button>

            {activeTab === "PENDING" && (
                <AdsList
                    ads={pendingCampaigns}
                    activeTab={activeTab}
                    onApprove={handleAccept}
                    onRejectClick={handleRejectClick}
                    onEdit={handleOpenEditModal}
                />
            )}

            {activeTab === "ACTIVE" && (
                <AdsList
                    ads={activeCampaigns}
                    activeTab={activeTab}
                    onApprove={handleAccept}
                    onRejectClick={handleRejectClick}
                    onEdit={handleOpenEditModal}
                />
            )}

            {activeTab === "REJECTED" && (
                <AdsList
                    ads={rejectedCampaigns}
                    activeTab={activeTab}
                    onApprove={handleAccept}
                    onRejectClick={handleRejectClick}
                    onEdit={handleOpenEditModal}
                />
            )}
        </>
    );
};

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_OWNER = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const AtlaspadDemoModule = buildModule("AtlaspadDemoModule", (m) => {
	const apToken = m.contract("APToken", [INITIAL_OWNER]);

	const apLock = m.contract("APLock", [INITIAL_OWNER]);

	const apPool = m.contract("APPool", [apLock]);

	const apPoolManager = m.contract("APPoolManager", [
		INITIAL_OWNER,
		INITIAL_OWNER,
		apPool,
	]);

	const apCampaignManager = m.contract("APCampaignManager", [
		INITIAL_OWNER,
	]);

	return { apToken, apLock, apPool, apPoolManager, apCampaignManager };
});

export default AtlaspadDemoModule;

/* eslint-disable @typescript-eslint/no-empty-function */
import { LicenseManager } from 'node_modules/@ag-grid-enterprise/core/dist/package/main.esm.mjs';

let applied = false;

export function setAgGridLicense() {
	if (applied) {
		return;
	}
	breakLicense();
	applied = true;
}

export function breakLicense() {
	const licProto = LicenseManager.prototype as any;
	licProto.outputInvalidLicenseKey = () => {};
	licProto.outputExpiredTrialKey = () => {};
	licProto.outputMissingLicenseKey = () => {};
	licProto.outputIncompatibleVersion = () => {};
	licProto.validateLicense = () => {};
    licProto.isDisplayWatermark = () => false;
}

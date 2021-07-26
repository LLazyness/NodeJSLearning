const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendinblue = (sendSmtpEmail) => {
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        return true;
    }, function(error) {
        console.error(error);
        return false;
    });
}

module.exports = sendinblue
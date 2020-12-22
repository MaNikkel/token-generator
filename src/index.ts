import GenerateTokenProvider from './modules/tokens/providers/GenerateTokenProvider';
import GenerateTokenService from './modules/tokens/services/GenerateTokenService';

const generateTokenProvider = new GenerateTokenProvider(
  '148733-9e56bbb3-3def-4d30-81c7-2c4a4a0e119f',
  'XRpWdyAplDIHwFE3flmCvg',
);
const generateTokenService = new GenerateTokenService(generateTokenProvider);

generateTokenService.execute();


import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { githubPagesConfig } from '@/lib/githubPagesConfig';

export default function GitHubPagesNotice() {
  if (!githubPagesConfig.isGitHubPages) {
    return null;
  }

  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>GitHub Pages 배포 안내:</strong> 이 사이트는 GitHub Pages에서 호스팅되고 있습니다. 
        일부 기능은 제한될 수 있으며, 실제 결제 처리는 되지 않습니다.
      </AlertDescription>
    </Alert>
  );
}

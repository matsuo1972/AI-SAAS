import { CreditStatus } from "@/components/dashboard/credit-status";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Tools } from "@/components/dashboard/tools";
import { Welcome } from "@/components/dashboard/welcome";

export default function DashboardPage() {
	return (
		<div className="space-y-8">
			<Welcome />
			<div className="grid gap-6 md:grid-cols-2">
				<CreditStatus />
				<RecentActivity />
			</div>
			<Tools />
		</div>
	);
}

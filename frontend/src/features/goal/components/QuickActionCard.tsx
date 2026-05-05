import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowDownCircle, Receipt, PlusCircle } from "lucide-react";

const actions = [
  {
    label: "Transfer",
    icon: TrendingUp,
    color: "hover:bg-green-600",
  },
  {
    label: "Withdraw",
    icon: ArrowDownCircle,
    color: "hover:bg-red-600",
  },
  {
    label: "Pay Bills",
    icon: Receipt,
    color: "hover:bg-blue-600",
  },
  {
    label: "Add Money",
    icon: PlusCircle,
    color: "hover:bg-purple-600",
  },
];

const QuickActionCard = () => {
  return (
    <Card className="bg-black text-white w-full max-w-[400px] rounded-2xl shadow-xl border-0 mt-5">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <button
              key={index}
              className={`
                flex flex-col items-center justify-center gap-2
                rounded-xl border border-green-500 p-4
                transition-all duration-200
                ${action.color}
                hover:scale-105 hover:shadow-lg
              `}
            >
              <Icon className="h-6 w-6" />
              <span className="text-sm font-semibold">{action.label}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;

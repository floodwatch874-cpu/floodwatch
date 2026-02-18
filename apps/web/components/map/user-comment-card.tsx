import { Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function UserCommentCard() {
    return (
        <Card className="w-full rounded-xl border bg-white px-5 py-4 shadow-sm">
            <div className="flex items-start gap-4">
                {/* AVATAR */}
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-slate-200 text-slate-700">
                        U
                    </AvatarFallback>
                </Avatar>

                {/* CONTENT */}
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">User</p>
                            <p className="text-xs text-slate-500">
                                11/29/2025, 3:00:00 PM
                            </p>
                        </div>

                        <button className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                            <Flag className="h-4 w-4" />
                        </button>
                    </div>

                    {/* MESSAGE */}
                    <p className="mt-4 text-sm text-slate-900">
                        AKSJDHKAJHSDKJASAKJJSHDKJA
                    </p>

                    {/* IMAGE */}
                    <div className="mt-3 overflow-hidden rounded-lg border">
                        <img
                            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                            alt="User uploaded"
                            className="h-[180px] w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
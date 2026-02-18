"use client";

import {
    MapPin,
    Clock,
    ArrowRight,
    Navigation,
    Crosshair,
    BookOpen,
    Phone,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NEARBY_PLACES = [
    { id: "nearby-01", name: "Camarin Healthcare and Emergency Clinic" },
    { id: "nearby-02", name: "Brgy 174 Covered Court" },
    { id: "nearby-03", name: "Caloocan City Medical Center" },
];

export default function SafetyLocationPanel() {
    return (
        <div className="fixed top-[64px] left-0 w-[480px] h-[calc(100vh-64px)] bg-white border-r border-slate-200 shadow-lg flex flex-col z-40">
            {/* IMAGE */}
            <div className="h-[240px] bg-linear-to-b from-slate-200 to-slate-300 shrink-0" />

            {/* CONTENT */}
            <div className="flex-1 flex flex-col px-6 pt-5 pb-4 min-h-0">
                {/* HEADER */}
                <div className="pb-5">
                    <h2 className="text-xl font-bold text-slate-900">
                        Dr. Jose Rodriguez Memorial Hospital
                    </h2>

                    <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock className="w-4 h-4 text-blue-600" />
                            Open 24hrs
                        </div>

                        <Badge className="bg-white border-green-400 text-green-600 border-2 text-[11px] uppercase rounded-full px-4 py-1">
                            Hospital
                        </Badge>
                    </div>
                </div>

                {/* TABS */}
                <Tabs defaultValue="overview" className="mt-4 flex flex-col min-h-0">
                    <TabsList className="h-12 w-full bg-transparent p-0 rounded-none grid grid-cols-2 border-b border-slate-200">
                        <TabsTrigger
                            value="overview"
                            className=""
                        >
                            <BookOpen className="w-4 h-4" />
                            Overview
                        </TabsTrigger>

                        <TabsTrigger
                            value="direction"
                            className=""
                        >
                            <ArrowRight className="w-4 h-4" />
                            Direction
                        </TabsTrigger>
                    </TabsList>

                    {/* OVERVIEW */}
                    <TabsContent
                        value="overview"
                        className="flex-1 min-h-0 overflow-y-auto pt-5 pr-2 space-y-6"
                    >
                        <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                                Address
                            </p>

                            <div className="rounded-xl border border-slate-200 p-4">
                                <div className="flex gap-3">
                                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-slate-800">
                                            Saint Joseph Avenue, Tala, Caloocan, 1427 Metro Manila
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            14.755200, 121.047900
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                                Contact
                            </p>

                            <div className="rounded-xl border border-slate-200 p-4 flex items-center gap-3">
                                <Phone className="w-4 h-4 text-slate-400" />
                                <p className="text-sm text-slate-800">0282942571</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                                Hours
                            </p>

                            <div className="rounded-xl border border-slate-200 p-4 flex gap-3">
                                <Clock className="w-4 h-4 text-slate-400" />
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Open 24 hours
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Mon-Sun • 00:00-24:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                                About
                            </p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                The Dr. Jose N. Rodriguez Memorial Hospital, formerly known as
                                Central Luzon Sanitarium, was established in 1940 to accommodate
                                patients with Hansen&apos;s Disease across Luzon.
                            </p>
                        </div>
                    </TabsContent>

                    {/* DIRECTION */}
                    <TabsContent
                        value="direction"
                        className="flex-1 min-h-0 overflow-y-auto pt-5 pr-2"
                    >
                        <div className="space-y-5">
                            <div className="flex gap-4 items-start">
                                {/* TIMELINE */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-2.5 h-2.5 mt-4 rounded-full border border-slate-300" />
                                    <div className="w-px h-6 bg-slate-200" />
                                    <MapPin className="w-4 h-4 text-red-500" />
                                </div>

                                {/* INPUTS */}
                                <div className="flex-1 space-y-3">
                                    <div className="relative">
                                        <Input className="h-12 px-5" placeholder="Choose starting point..." />
                                    </div>

                                    <div className="relative">
                                        <Input className="h-12 px-5" placeholder="Choose destination..." />
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-4 py-7 rounded-xl"
                            >
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                    <Crosshair className="w-5 h-5 text-blue-600" />
                                </div>

                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-semibold text-slate-900">
                                        Your Location
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Click to use GPS
                                    </span>
                                </div>
                            </Button>

                            <div className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                                    Nearby Places
                                </p>

                                <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-300" />
                                    Camarin Healthcare and Emergency Clinic
                                </Button>

                                <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-300" />
                                    Brgy 174 Covered Court
                                </Button>

                                <Button variant="ghost" className="w-full justify-start gap-3 py-6 text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-300" />
                                    Caloocan City Medical Center
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
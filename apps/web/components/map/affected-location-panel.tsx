"use client";

import { MapPin, Clock, Users, ArrowRight, Navigation, Crosshair, ImagePlus, Send } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UserCommentCard from "./user-comment-card";

export default function AffectedLocationPanel() {
    return (
        <div className="fixed top-[64px] overflow-hidden left-0 w-[480px] h-[calc(100vh-64px)] bg-white border-r border-slate-200 shadow-lg flex flex-col z-40">
            {/* IMAGE PLACEHOLDER */}
            <div className="h-[200px] bg-linear-to-b from-slate-200 to-slate-300 shrink-0" />

            {/* CONTENT */}
            <div className="flex-1 flex flex-col p-5 min-h-0">
                {/* HEADER */}
                <div className="mb-6 shrink-0">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">
                        Brgy. 174, Kaimall, Caloocan City
                    </h2>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            Posted 24hrs ago
                        </div>

                        <Badge className="bg-red-500 text-white text-[10px] uppercase rounded-full px-3">
                            Critical
                        </Badge>
                    </div>
                </div>

                {/* TABS */}
                <Tabs defaultValue="direction" className="flex-1 flex flex-col min-h-0">
                    <TabsList className="relative bg-transparent border-b grid grid-cols-2 w-full rounded-none p-0">
                        <TabsTrigger
                            value="direction"
                            className=""
                        >
                            <ArrowRight className="w-4 h-4" />
                            Direction
                        </TabsTrigger>

                        <TabsTrigger
                            value="community"
                            className=""
                        >
                            <Users className="w-4 h-4" />
                            Community
                        </TabsTrigger>
                    </TabsList>

                    {/* DIRECTION TAB */}
                    <TabsContent value="direction" className="flex-1 overflow-y-auto pt-6 space-y-6 pr-2">
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
                                    <Navigation className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                </div>

                                <div className="relative">
                                    <Input className="h-12 px-5" placeholder="Choose destination..." />
                                </div>
                            </div>
                        </div>

                        <Button variant="ghost" className="w-full py-8 justify-start">
                            <div className="flex items-center gap-4 pl-6">
                                <div className="bg-blue-200 p-2 rounded-full">
                                    <Crosshair className="w-5 h-5 text-blue-600" />
                                </div>

                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold text-slate-800">
                                        Your Location
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        Click to use GPS
                                    </span>
                                </div>
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
                    </TabsContent>

                    {/* COMMUNITY TAB */}
                    <TabsContent
                        value="community"
                        className="flex-1 pt-2 text-sm flex flex-col min-h-0"
                    >

                        <div className="rounded-xl border bg-white p-4 space-y-3 mb-6">
                            {/* TEXTAREA */}
                            <Textarea
                                placeholder="Share with your community..."
                                className="min-h-[120px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />

                            {/* ACTIONS */}
                            <div className="flex items-center justify-end gap-2">
                                {/* FILE INPUT */}
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                    accept="image/*"
                                />

                                <label
                                    htmlFor="imageUpload"
                                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-100"
                                >
                                    <ImagePlus className="h-4 w-4" />
                                    Add Image
                                </label>

                                {/* POST BUTTON */}
                                <Button className="flex items-center gap-2">
                                    <Send className="h-4 w-4" />
                                    Post Comment
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            <UserCommentCard />
                            <UserCommentCard />
                            <UserCommentCard />

                        </div>


                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
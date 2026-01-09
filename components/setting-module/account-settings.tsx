"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { useId, useMemo } from "react";


const languages = [
    { label: "English", value: "en" },
] as const



export default function AccountSettings() {
    const [mounted, setMounted] = React.useState(false);
    const { theme, setTheme } = useTheme();

    const id = useId();

   

    React.useEffect(() => {
        setMounted(true)
    }, [])


    const timezones = Intl.supportedValuesOf("timeZone");

    const formattedTimezones = useMemo(() => {
        return timezones
            .map((timezone) => {
                const formatter = new Intl.DateTimeFormat("en", {
                    timeZone: timezone,
                    timeZoneName: "shortOffset",
                });
                const parts = formatter.formatToParts(new Date());
                const offset = parts.find((part) => part.type === "timeZoneName")?.value || "";
                const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

                return {
                    value: timezone,
                    label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
                    numericOffset: parseInt(offset.replace("GMT", "").replace("+", "") || "0"),
                };
            })
            .sort((a, b) => a.numericOffset - b.numericOffset);
    }, [timezones]);
    return (
        <div className="mx-auto">
     <div>
                    <Label className="text-sm" >Timezone select</Label>
                    <p className="text-xs mb-3 text-muted-foreground">Select the timezone for the dashboard.</p>
                    <Select defaultValue="Europe/London">
                        <SelectTrigger id={id}>
                            <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="w-full h-80">
                            {formattedTimezones.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-sm">Language Select</Label>
                    <p className="text-xs mb-3 text-muted-foreground">Select the language for the dashboard.</p>
                    <Select defaultValue={"en"} disabled>
                        <SelectTrigger id={id}>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {languages.map(({ value, label }) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-sm">Mode</Label>
                    <p className="text-xs mb-3 text-muted-foreground">Select the mode for the dashboard.</p>
                    <div className="flex flex-wrap gap-2">
                        {mounted ? [
                            { label: "Light", value: "light", bgColor: "bg-[#ecedef]", textColor: "bg-white", icolor: "bg-[#ecedef]" },
                            { label: "Dark", value: "dark", bgColor: "bg-slate-950", textColor: "bg-slate-800", icolor: "bg-slate-400" },
                            {
                                label: "System", value: "system", bgColor: "bg-[#ecedef]", textColor: "bg-gray-900", icolor: "bg-[#ecedef]"
                            }
                        ].map(({ label, value, bgColor, textColor, icolor }) => (
                            <div
                                key={value}
                                className={`items-center
                                    }`}
                                onClick={() => setTheme(value)}
                            >
                                <div className={`p-1 rounded-lg ${theme === value ? "border border--muted-foreground" : ""}`}>
                                    <div className={`space-y-2 rounded-lg p-1.5 md:p-2 ${bgColor}`}>
                                        <div className={`space-y-2 rounded-md p-2 -xs  ${textColor}`}>
                                            <div className={`md:h-2 h-1  w-5 md:w-[80px] rounded-lg ${icolor}`} />
                                            <div className={`md:h-2 h-1 w-[30px] md:w-[100px] rounded-lg ${icolor}`} />
                                        </div>
                                        <div className={`flex items-center space-x-2 rounded-md p-2 -xs   ${textColor}`}>
                                            <div className={`md:h-4  h-2 w-2 md:w-4 rounded-full ${icolor}`} />
                                            <div className={`md:h-2 h-1 w-7.5 md:w-25 rounded-lg ${icolor}`} />
                                        </div>

                                    </div>
                                </div>
                                <span className="block w-full text-center text-sm p-2 text-muted-foreground">{label}</span>
                            </div>
                        )) : [1, 2, 3].map(index => <Skeleton key={index} className="h-8 w-full" />)}
                    </div>
                </div>
        </div>
    );
}
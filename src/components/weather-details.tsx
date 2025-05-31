import type { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({data}: WeatherDetailsProps) => {
    const { main, wind, sys } = data;

    const getWindDirection = (degree: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree ) / 45) % 8;
        return directions[index];
    }

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), 'hh:mm a');
    };

    const datails = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-yellow-500",
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500",
        },
        {
            title: "Wind Directon",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°C)`,
            icon: Compass,
            color: "text-green-500",
        }, 
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-red-500",
        }
    ];

  return (
    <Card>
  <CardHeader>
    <CardTitle>Weather Details</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-6 sm:grid-cols-2">
        {datails.map((detail) => {
            return (
                <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
                    <detail.icon className={`h-5 w-5 ${detail.color}`}/>
                    <div>
                        <p className="text-sm font-medium leading-none">{detail.title}</p>
                        <p className="text-sm text-muted-foreground">{detail.value}</p>
                    </div>
                </div>
            )
        })}
    </div>
  </CardContent>
</Card>
  )
}

export default WeatherDetails
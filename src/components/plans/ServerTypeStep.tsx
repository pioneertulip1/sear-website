import { Card, CardContent } from "@/components/ui/card"
import { ServerType, StepProps } from "./types"
import { Button } from "@/components/ui/button"

const SERVER_TYPE_INFO = {
  PaperMC: {
    name: "PaperMC",
    description: "High performance fork of Spigot with additional features and optimizations"
  },
  Fabric: {
    name: "Fabric",
    description: "Lightweight, modular modding toolchain for Minecraft"
  },
  PocketmineMP: {
    name: "PocketmineMP",
    description: "Server software for Minecraft: Bedrock Edition"
  },
  Forge: {
    name: "Forge",
    description: "Popular modding API for Minecraft: Java Edition"
  },
  GeyserMC: {
    name: "GeyserMC",
    description: "Bridge between Minecraft: Java Edition and Bedrock Edition"
  }
}

export default function ServerTypeStep({ state, onUpdate, onNext, onBack, availableOptions }: StepProps) {
  const serverTypes = availableOptions as ServerType[]
  
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Select Server Type</h2>
        <p className="text-gray-600">Choose the server software that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serverTypes.map((type) => (
          <Card
            key={type}
            className={`${
              state.serverType === type ? 'border-2 border-primary' : ''
            }`}
            onClick={() => {
              onUpdate({ serverType: type })
              onNext()
            }}
          >
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">{SERVER_TYPE_INFO[type].name}</h3>
              <p className="text-sm text-gray-600">{SERVER_TYPE_INFO[type].description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {onBack && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full md:w-auto"
          >
            Back
          </Button>
        </div>
      )}
    </div>
  )
}
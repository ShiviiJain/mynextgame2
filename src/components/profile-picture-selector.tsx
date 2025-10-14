"use client"

import { useState, useRef } from "react"
import { Upload, User, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfilePictureSelectorProps {
  currentImage?: string | null
  onImageSelect: (imageUrl: string) => void
  className?: string
}

export function ProfilePictureSelector({ 
  currentImage, 
  onImageSelect, 
  className 
}: ProfilePictureSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<'default' | 'custom' | 'upload'>('default')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Your custom avatar as a data URL (base64 encoded)
  const customAvatar = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjQwIiByPSIxNSIgZmlsbD0iI2ZmYjNjYiIvPgo8cGF0aCBkPSJNMjUgNzVjMC0xMy44IDEyLjItMjUgMjUtMjVzMjUgMTEuMiAyNSA1IiBmaWxsPSIjZmZiM2NiIi8+Cjx0ZXh0IHg9IjUwIiB5PSI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmYjNjYiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5HQU1FUzwvdGV4dD4KPC9zdmc+"

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        onImageSelect(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleOptionSelect = (option: 'default' | 'custom' | 'upload') => {
    setSelectedOption(option)
    
    if (option === 'default') {
      onImageSelect('')
    } else if (option === 'custom') {
      onImageSelect(customAvatar)
    } else if (option === 'upload') {
      fileInputRef.current?.click()
    }
  }

  const getCurrentImage = () => {
    if (selectedOption === 'custom') return customAvatar
    if (selectedOption === 'upload' && previewUrl) return previewUrl
    if (currentImage) return currentImage
    return null
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Current Profile Picture Display */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border">
            {getCurrentImage() ? (
              <img 
                src={getCurrentImage()!} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          {selectedOption === 'custom' && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Selection Options */}
      <div className="grid grid-cols-3 gap-3">
        {/* Default Avatar */}
        <button
          onClick={() => handleOptionSelect('default')}
          className={cn(
            "p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105",
            selectedOption === 'default' 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-xs text-center text-muted-foreground">Default</p>
        </button>

        {/* Custom Avatar */}
        <button
          onClick={() => handleOptionSelect('custom')}
          className={cn(
            "p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105",
            selectedOption === 'custom' 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-2 overflow-hidden border border-border">
            <img 
              src={customAvatar} 
              alt="Custom Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">Gaming</p>
        </button>

        {/* Upload Option */}
        <button
          onClick={() => handleOptionSelect('upload')}
          className={cn(
            "p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105",
            selectedOption === 'upload' 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50"
          )}
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
            <Upload className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-xs text-center text-muted-foreground">Upload</p>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Instructions */}
      {selectedOption === 'upload' && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Click the upload button above to select an image from your device
          </p>
        </div>
      )}
    </div>
  )
}

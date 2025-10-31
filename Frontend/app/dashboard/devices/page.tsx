"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import {
  Smartphone,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  MoreHorizontal,
  RefreshCw
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAllDevices, useUpdateDeviceStatus } from "@/lib/hooks/useAdmin"

interface Device {
  id: string
  userId: string
  deviceId: string
  status: string
  requestedAt: Date
  verifiedAt: Date | null
  user?: {
    id: string
    email: string
    fname: string
    lname: string
  }
}

export default function DevicesPage() {
  const { data: devices, isLoading, error, refetch } = useAllDevices()
  const updateDeviceStatusMutation = useUpdateDeviceStatus()

  if (error) {
    console.error('Error fetching devices:', error)
    toast.error('Failed to load devices')
  }

  const updateDeviceStatus = async (deviceId: string, status: string) => {
    try {
      await updateDeviceStatusMutation.mutateAsync({ deviceId, status })
      toast.success(`Device ${status} successfully`)
    } catch (error) {
      console.error('Error updating device status:', error)
      toast.error('Failed to update device status')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading devices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600">Review and manage device verification requests</p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4">
        {devices?.map((device) => (
          <Card key={device.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Device {device.deviceId.slice(-8)}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {device.user ? `${device.user.fname} ${device.user.lname}` : 'Unknown User'}
                      <span className="text-gray-400">•</span>
                      {device.user?.email}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(device.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {device.status !== 'verified' && (
                        <DropdownMenuItem
                          onClick={() => updateDeviceStatus(device.id, 'verified')}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Device
                        </DropdownMenuItem>
                      )}
                      {device.status !== 'rejected' && (
                        <DropdownMenuItem
                          onClick={() => updateDeviceStatus(device.id, 'rejected')}
                          className="text-red-600"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Device
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Requested:</span>
                  <span>{new Date(device.requestedAt).toLocaleDateString()}</span>
                </div>
                {device.verifiedAt && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-gray-600">Verified:</span>
                    <span>{new Date(device.verifiedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {devices?.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Smartphone className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No devices found</h3>
              <p className="text-gray-600 text-center">Device verification requests will appear here when users register new devices.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
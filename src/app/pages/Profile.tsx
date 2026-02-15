import { Users, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';

export function Profile() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pt-4 mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#EAB308] to-[#FCD34D] rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Family Account</h1>
        <p className="text-gray-600">You & Your Wife</p>
      </div>
      
      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Settings</h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-sm text-gray-500">Manage your alerts</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Privacy & Security</p>
              <p className="text-sm text-gray-500">Control your data</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900">Help & Support</p>
              <p className="text-sm text-gray-500">Get assistance</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* Account Info */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Users</span>
            <span className="font-medium text-gray-900">2 (You & Wife)</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Total Transactions</span>
            <span className="font-medium text-gray-900">15</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Member Since</span>
            <span className="font-medium text-gray-900">Jan 2024</span>
          </div>
        </div>
      </div>
      
      {/* Logout */}
      <button className="w-full bg-white rounded-2xl shadow-md p-4 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 transition-colors">
        <LogOut className="w-5 h-5" />
        <span className="font-semibold">Log Out</span>
      </button>
    </div>
  );
}

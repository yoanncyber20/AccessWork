import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building2, Calendar, Briefcase, Edit2, Save, X, Camera, Shield, Clock, Award, TrendingUp } from 'lucide-react';
import RippleButton from './RippleButton';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Yoann',
    lastName: 'Dupont',
    email: 'yoann.dupont@accesswork.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris, France',
    department: 'Développement',
    position: 'Développeur Full Stack',
    employeeId: 'EMP-2024-001',
    startDate: '15 Janvier 2022',
    manager: 'Sophie Martin',
    contract: 'CDI - Temps plein',
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
    toast.success('Profile updated successfully!', {
      description: 'Your personal information has been saved.',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const stats = [
    { 
      label: 'Ancienneté', 
      value: '2 ans 9 mois', 
      icon: Calendar, 
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
    },
    { 
      label: 'Projets Complétés', 
      value: '47', 
      icon: Award, 
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
    },
    { 
      label: 'Taux de Présence', 
      value: '98%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
    },
    { 
      label: 'Hours this month', 
      value: '152h', 
      icon: Clock, 
      color: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/30',
    },
  ];

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header with Profile Picture */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#6750A4] to-[#7C68B8] p-8 pb-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-white" strokeWidth={2} />
                <h1 className="text-[28px] text-white">Mon Profil</h1>
              </div>
              <Badge className="bg-white/20 text-white !border-0 px-4 py-2 rounded-full backdrop-blur-sm">
                {profileData.contract}
              </Badge>
            </div>
            <p className="text-white/90 text-[16px]">
              Manage your personal and professional information
            </p>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="relative px-8 -mt-16 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#D0BCFF] to-[#6750A4] elevation-3 flex items-center justify-center border-4 border-card">
                <User className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary hover:bg-primary/90 rounded-full elevation-2 hover:elevation-3 card-transition flex items-center justify-center group-hover:scale-110 transition-transform focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-[24px] mb-2">{profileData.firstName} {profileData.lastName}</h2>
              <div className="flex flex-wrap gap-3 text-[14px] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {profileData.position}
                </span>
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {profileData.department}
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  {profileData.employeeId}
                </span>
              </div>
            </div>

            {!isEditing ? (
              <RippleButton
                onClick={handleEdit}
                className="min-h-[56px] px-8 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px] self-start md:self-auto"
              >
                <Edit2 className="w-5 h-5 mr-2" />
                Edit
              </RippleButton>
            ) : (
              <div className="flex gap-3">
                <RippleButton
                  onClick={handleSave}
                  className="min-h-[56px] px-8 bg-green-600 text-white rounded-full hover:bg-green-700 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px]"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save
                </RippleButton>
                <RippleButton
                  onClick={handleCancel}
                  className="min-h-[56px] px-8 bg-muted text-foreground rounded-full hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[16px]"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </RippleButton>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom duration-500 delay-100">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden p-6 ${stat.bgLight} ${stat.bgDark} elevation-1 hover:elevation-3 card-transition group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 rounded-3xl !border-0`}
            tabIndex={0}
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center elevation-2 group-hover:elevation-3 group-hover:scale-110 transition-all duration-300 mb-4`}>
                <stat.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-[14px] text-muted-foreground mb-2">{stat.label}</p>
              <p className="text-[24px]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Personal Information */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center elevation-2">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-[22px] mb-1">Personal Information</h2>
            <p className="text-muted-foreground text-[16px]">Your contact details and information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Prénom
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
              />
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
                {profileData.firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Nom
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
              />
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
                {profileData.lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
              />
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
                {profileData.email}
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              Téléphone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
              />
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
                {profileData.phone}
              </div>
            )}
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Adresse
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editedData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-4 rounded-xl bg-input-background !border-0 focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 min-h-[56px] text-[16px] hover:bg-muted/50 transition-colors duration-250 card-transition hover:elevation-1 elevation-0"
              />
            ) : (
              <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
                {profileData.address}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Professional Information */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-300">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center elevation-2">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-[22px] mb-1">Professional Information</h2>
            <p className="text-muted-foreground text-[16px]">Details of your position and contract</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Position */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              Poste
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.position}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              Département
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.department}
            </div>
          </div>

          {/* Employee ID */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              Matricule
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.employeeId}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              Date d'embauche
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.startDate}
            </div>
          </div>

          {/* Manager */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Manager
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.manager}
            </div>
          </div>

          {/* Contract */}
          <div>
            <label className="block mb-3 text-[16px] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              Type de contrat
            </label>
            <div className="p-4 rounded-xl bg-muted/30 min-h-[56px] flex items-center text-[16px]">
              {profileData.contract}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

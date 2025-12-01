import React, { useState } from 'react';
import { FileText, Download, Upload, Folder, Search, Filter, Eye, Share2, Trash2, MoreVertical, File, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import { Card } from './ui/card';
import RippleButton from './RippleButton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface DocumentsProps {}

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'img';
  category: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  downloads: number;
}

export default function Documents() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const documents: Document[] = [
    {
      id: 1,
      name: 'Internal Rules 2025.pdf',
      type: 'pdf',
      category: 'Administrative',
      size: '2.4 MB',
      uploadDate: '15 Oct 2025',
      uploadedBy: 'Sophie Martin',
      downloads: 45,
    },
    {
      id: 2,
      name: 'Onboarding Guide.pdf',
      type: 'pdf',
      category: 'Training',
      size: '5.1 MB',
      uploadDate: '12 Oct 2025',
      uploadedBy: 'Marie Dubois',
      downloads: 128,
    },
    {
      id: 3,
      name: 'Budget Q4 2025.xlsx',
      type: 'xls',
      category: 'Finance',
      size: '1.8 MB',
      uploadDate: '10 Oct 2025',
      uploadedBy: 'Thomas Petit',
      downloads: 32,
    },
    {
      id: 4,
      name: 'Product Presentation.pdf',
      type: 'pdf',
      category: 'Marketing',
      size: '8.2 MB',
      uploadDate: '8 Oct 2025',
      uploadedBy: 'Claire Dubois',
      downloads: 67,
    },
    {
      id: 5,
      name: 'Company Logo.png',
      type: 'img',
      category: 'Branding',
      size: '450 KB',
      uploadDate: '5 Oct 2025',
      uploadedBy: 'Marie Dubois',
      downloads: 89,
    },
    {
      id: 6,
      name: 'Standard Contract.docx',
      type: 'doc',
      category: 'Administrative',
      size: '120 KB',
      uploadDate: '3 Oct 2025',
      uploadedBy: 'Sophie Martin',
      downloads: 54,
    },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return { icon: FileText, color: 'from-red-500 to-red-600', bgLight: 'bg-red-50', bgDark: 'dark:bg-red-950/30' };
      case 'doc':
        return { icon: File, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-950/30' };
      case 'xls':
        return { icon: FileSpreadsheet, color: 'from-green-500 to-green-600', bgLight: 'bg-green-50', bgDark: 'dark:bg-green-950/30' };
      case 'img':
        return { icon: ImageIcon, color: 'from-purple-500 to-purple-600', bgLight: 'bg-purple-50', bgDark: 'dark:bg-purple-950/30' };
      default:
        return { icon: FileText, color: 'from-gray-500 to-gray-600', bgLight: 'bg-gray-50', bgDark: 'dark:bg-gray-950/30' };
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pdf') return doc.type === 'pdf' && matchesSearch;
    if (activeTab === 'docs') return (doc.type === 'doc' || doc.type === 'xls') && matchesSearch;
    if (activeTab === 'images') return doc.type === 'img' && matchesSearch;
    return matchesSearch;
  });

  const stats = [
    { 
      label: 'Total Documents', 
      value: documents.length.toString(), 
      icon: FileText, 
      color: 'from-blue-500 to-blue-600',
      bgLight: 'bg-blue-50',
      bgDark: 'dark:bg-blue-950/30',
    },
    { 
      label: 'Downloads', 
      value: documents.reduce((acc, doc) => acc + doc.downloads, 0).toString(), 
      icon: Download, 
      color: 'from-green-500 to-green-600',
      bgLight: 'bg-green-50',
      bgDark: 'dark:bg-green-950/30',
    },
    { 
      label: 'Categories', 
      value: new Set(documents.map(d => d.category)).size.toString(), 
      icon: Folder, 
      color: 'from-purple-500 to-purple-600',
      bgLight: 'bg-purple-50',
      bgDark: 'dark:bg-purple-950/30',
    },
    { 
      label: 'Space Used', 
      value: '23.5 MB', 
      icon: FileText, 
      color: 'from-orange-500 to-orange-600',
      bgLight: 'bg-orange-50',
      bgDark: 'dark:bg-orange-950/30',
    },
  ];

  const handleDownload = (docName: string) => {
    toast.success('Download started', {
      description: `${docName} is downloading`,
    });
  };

  const handleUpload = () => {
    toast.success('Document upload', {
      description: 'Feature in development',
    });
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Header */}
      <Card className="elevation-2 hover:elevation-3 card-transition !border-0 rounded-3xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-[#6750A4] to-[#7C68B8] p-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center elevation-2">
                  <FileText className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-[28px] text-white">Documents & Resources</h1>
                  <p className="text-white/90 text-[16px]">Access all your company documents</p>
                </div>
              </div>
              <RippleButton
                onClick={handleUpload}
                className="min-h-[56px] px-8 bg-white text-primary rounded-full hover:bg-white/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px]"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload
              </RippleButton>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="text"
                placeholder="Search document..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-sm !border-0 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-[16px] text-white placeholder:text-white/60 hover:bg-white/20 transition-colors duration-250"
              />
            </div>
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

      {/* Documents List */}
      <Card className="p-8 elevation-2 hover:elevation-3 card-transition rounded-3xl !border-0 animate-in fade-in slide-in-from-bottom duration-500 delay-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-muted/30 rounded-2xl p-1 mb-8">
            <TabsTrigger value="all" className="h-12 rounded-xl text-[16px]">
              All
            </TabsTrigger>
            <TabsTrigger value="pdf" className="h-12 rounded-xl text-[16px]">
              PDF
            </TabsTrigger>
            <TabsTrigger value="docs" className="h-12 rounded-xl text-[16px]">
              Documents
            </TabsTrigger>
            <TabsTrigger value="images" className="h-12 rounded-xl text-[16px]">
              Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-[16px]">No documents found</p>
              </div>
            ) : (
              filteredDocuments.map((doc, index) => {
                const fileConfig = getFileIcon(doc.type);
                const FileIcon = fileConfig.icon;

                return (
                  <div
                    key={doc.id}
                    className={`p-6 rounded-2xl ${fileConfig.bgLight} ${fileConfig.bgDark} elevation-0 hover:elevation-2 card-transition animate-in fade-in slide-in-from-bottom duration-500 !border-0`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${fileConfig.color} flex items-center justify-center elevation-2 flex-shrink-0`}>
                          <FileIcon className="w-7 h-7 text-white" strokeWidth={2.5} />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-[18px] mb-2">{doc.name}</h3>
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge className={`${fileConfig.bgLight} ${fileConfig.bgDark} !border-0 px-3 py-1 rounded-full text-[13px]`}>
                                {doc.category}
                              </Badge>
                              <span className="text-[14px] text-muted-foreground">{doc.size}</span>
                              <span className="text-[14px] text-muted-foreground">•</span>
                              <span className="text-[14px] text-muted-foreground">{doc.uploadDate}</span>
                              <span className="text-[14px] text-muted-foreground">•</span>
                              <span className="text-[14px] text-muted-foreground">By {doc.uploadedBy}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-[14px] text-muted-foreground">
                            <Download className="w-4 h-4" />
                            <span>{doc.downloads} downloads</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <RippleButton
                          className="min-h-[48px] min-w-[48px] p-3 bg-muted text-foreground rounded-2xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2"
                        >
                          <Eye className="w-5 h-5" />
                        </RippleButton>
                        <RippleButton
                          className="min-h-[48px] min-w-[48px] p-3 bg-muted text-foreground rounded-2xl hover:bg-muted/80 elevation-1 hover:elevation-2 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2"
                        >
                          <Share2 className="w-5 h-5" />
                        </RippleButton>
                        <RippleButton
                          onClick={() => handleDownload(doc.name)}
                          className="min-h-[48px] px-6 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 elevation-2 hover:elevation-3 card-transition focus-visible:outline-2 focus-visible:outline-[#D0BCFF] focus-visible:outline-offset-2 text-[15px]"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Download
                        </RippleButton>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

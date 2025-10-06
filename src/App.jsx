import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  Workflow, 
  Search, 
  Plus,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Database,
  Cloud,
  MoreHorizontal,
  Bell,
  User,
  Menu,
  X
} from 'lucide-react'
import './App.css'

const mockWorkflows = [
  {
    id: 1,
    name: 'Customer Data Pipeline',
    status: 'running',
    lastRun: '2 minutes ago',
    success: 98.5,
    description: 'Extract, transform, and load customer data from multiple sources',
    duration: '4m 32s',
    nextRun: 'In 58 minutes'
  },
  {
    id: 2,
    name: 'ML Model Training',
    status: 'completed',
    lastRun: '1 hour ago',
    success: 100,
    description: 'Train recommendation model with latest customer behavior data',
    duration: '12m 15s',
    nextRun: 'Tomorrow at 9:00 AM'
  },
  {
    id: 3,
    name: 'Business Intelligence Reports',
    status: 'failed',
    lastRun: '3 hours ago',
    success: 85.2,
    description: 'Generate comprehensive business intelligence dashboards',
    duration: '2m 45s',
    nextRun: 'Retry in 15 minutes'
  },
  {
    id: 4,
    name: 'API Data Synchronization',
    status: 'scheduled',
    lastRun: '6 hours ago',
    success: 92.1,
    description: 'Synchronize data across multiple third-party APIs',
    duration: '1m 23s',
    nextRun: 'In 2 hours'
  }
]

const mockStats = {
  totalWorkflows: 24,
  activeRuns: 7,
  successRate: 94.2,
  avgExecutionTime: '3.2m',
  totalExecutions: 1247,
  dataProcessed: '2.4TB'
}

const mockPlugins = [
  { name: 'PostgreSQL', category: 'Database', icon: Database, status: 'active', version: '2.1.0' },
  { name: 'AWS S3', category: 'Storage', icon: Cloud, status: 'active', version: '1.8.3' },
  { name: 'Apache Kafka', category: 'Messaging', icon: Zap, status: 'active', version: '3.2.1' },
  { name: 'Python Runtime', category: 'Script', icon: GitBranch, status: 'active', version: '3.11.0' },
  { name: 'Docker', category: 'Container', icon: Settings, status: 'inactive', version: '24.0.7' },
  { name: 'Elasticsearch', category: 'Search', icon: Database, status: 'active', version: '8.11.0' }
]

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-blue-500/10 text-blue-600 border-blue-200/30 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30'
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-200/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30'
      case 'failed': return 'bg-red-500/10 text-red-600 border-red-200/30 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30'
      case 'scheduled': return 'bg-amber-500/10 text-amber-600 border-amber-200/30 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200/30 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return <Activity className="w-3.5 h-3.5" />
      case 'completed': return <CheckCircle className="w-3.5 h-3.5" />
      case 'failed': return <XCircle className="w-3.5 h-3.5" />
      case 'scheduled': return <Clock className="w-3.5 h-3.5" />
      default: return <AlertCircle className="w-3.5 h-3.5" />
    }
  }

  const filteredWorkflows = mockWorkflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Liquid Glass Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
              
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <Workflow className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Kestra</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Workflow Orchestrator</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
              >
                <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
              >
                <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </motion.button>
              
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 p-1">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="workflows" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
            >
              <Workflow className="w-4 h-4 mr-2" />
              Workflows
            </TabsTrigger>
            <TabsTrigger 
              value="plugins" 
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Plugins
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="dashboard" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { title: 'Total Workflows', value: mockStats.totalWorkflows, change: '+12%', icon: Workflow, color: 'from-blue-500 to-cyan-500' },
                  { title: 'Active Runs', value: mockStats.activeRuns, change: '+5%', icon: Activity, color: 'from-green-500 to-emerald-500' },
                  { title: 'Success Rate', value: `${mockStats.successRate}%`, change: '+2.1%', icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
                  { title: 'Avg Execution', value: mockStats.avgExecutionTime, change: '-8%', icon: Clock, color: 'from-orange-500 to-red-500' },
                  { title: 'Total Executions', value: mockStats.totalExecutions.toLocaleString(), change: '+156%', icon: Zap, color: 'from-indigo-500 to-purple-500' },
                  { title: 'Data Processed', value: mockStats.dataProcessed, change: '+89%', icon: Database, color: 'from-teal-500 to-cyan-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.change} from last month</p>
                          </div>
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-slate-900 dark:text-white">Recent Activity</CardTitle>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          Latest workflow executions and their status
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50">
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWorkflows.slice(0, 4).map((workflow, index) => (
                        <motion.div
                          key={workflow.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-700/40 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-200 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {getStatusIcon(workflow.status)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900 dark:text-white truncate">{workflow.name}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <p className="text-sm text-slate-500 dark:text-slate-400">{workflow.lastRun}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">•</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{workflow.duration}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getStatusColor(workflow.status)}>
                              {workflow.status}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="workflows" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Workflows</h2>
                  <p className="text-slate-600 dark:text-slate-400">Manage and monitor your workflow executions</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/50 focus:bg-white/70 dark:focus:bg-slate-800/70 transition-all duration-200"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {filteredWorkflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-slate-900 dark:text-white">{workflow.name}</CardTitle>
                            <Badge className={getStatusColor(workflow.status)}>
                              {getStatusIcon(workflow.status)}
                              <span className="ml-1.5">{workflow.status}</span>
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        <CardDescription className="text-slate-600 dark:text-slate-400">
                          {workflow.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Last Run</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{workflow.lastRun}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Duration</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{workflow.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Success Rate</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{workflow.success}%</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Next Run</p>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{workflow.nextRun}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-4">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${workflow.success}%` }}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 hover:bg-white/70 dark:hover:bg-slate-700/70">
                              <Play className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 hover:bg-white/70 dark:hover:bg-slate-700/70">
                              <Settings className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="plugins" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Plugins</h2>
                    <p className="text-slate-600 dark:text-slate-400">Extend Kestra with powerful integrations</p>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25">
                    Browse Marketplace
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockPlugins.map((plugin, index) => (
                    <motion.div
                      key={plugin.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                    >
                      <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-white/20 dark:border-slate-700/50 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                              <plugin.icon className="w-6 h-6 text-white" />
                            </div>
                            <Badge 
                              variant={plugin.status === 'active' ? 'default' : 'secondary'}
                              className={plugin.status === 'active' 
                                ? 'bg-green-500/10 text-green-600 border-green-200/30 dark:bg-green-500/20 dark:text-green-400 dark:border-green-500/30' 
                                : 'bg-gray-500/10 text-gray-600 border-gray-200/30 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30'
                              }
                            >
                              {plugin.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{plugin.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{plugin.category}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Version {plugin.version}</p>
                          </div>
                          <div className="mt-4 pt-4 border-t border-white/20 dark:border-slate-700/50">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full bg-white/50 dark:bg-slate-700/50 border-white/20 dark:border-slate-600/50 hover:bg-white/70 dark:hover:bg-slate-700/70"
                            >
                              {plugin.status === 'active' ? 'Configure' : 'Install'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}

export default App

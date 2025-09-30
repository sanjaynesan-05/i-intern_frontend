import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Badge } from '@/shared/components/ui/badge';
import { Loader2, Send, CheckCircle, Brain, Shield, Target, Clock, Code, TrendingUp, History, Play, Pause, RotateCcw } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Types
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  hasCode?: boolean;
  codeContent?: string;
  language?: string;
}

interface EvaluationData {
  skill: string;
  intellectualMetrics: {
    problemSolving: number;
    reasoning: number;
    clarity: number;
    speed: number;
    codeQuality?: number;
  };
  aiDetection: {
    plagiarismScore: number;
    humanContentScore: number;
  };
  completionTime: number;
  totalQuestions: number;
}

interface HistoricalAssessment {
  id: string;
  skill: string;
  date: Date;
  evaluation: EvaluationData;
  duration: number;
}

interface TimerState {
  timeRemaining: number;
  isActive: boolean;
  isPaused: boolean;
  totalTime: number;
}

// Views enum
enum View {
  SKILL_SELECTION = 'skill-selection',
  ASSESSMENT = 'assessment', 
  ANALYSIS = 'analysis',
  EVALUATION = 'evaluation',
  HISTORY = 'history'
}

// Mock AI responses for different skills
const mockQuestions: { [skill: string]: string[] } = {
  default: [
    "Can you explain the fundamental concepts of this skill?",
    "Describe a challenging problem you've solved using this skill.",
    "What are the best practices you follow when applying this skill?",
    "How do you stay updated with the latest developments in this area?",
    "Can you walk me through your problem-solving approach for this skill?"
  ],
  javascript: [
    "Explain the concept of closures in JavaScript and provide an example.",
    "What's the difference between let, const, and var in JavaScript?",
    "How would you implement a debounce function from scratch?",
    "Describe the event loop in JavaScript and how it handles asynchronous operations.",
    "What are the key differences between arrow functions and regular functions?"
  ],
  react: [
    "Explain the React component lifecycle and hooks.",
    "How do you optimize React applications for performance?",
    "What's the difference between controlled and uncontrolled components?",
    "Describe how you would implement state management in a large React application.",
    "Explain the concept of React reconciliation and the virtual DOM."
  ],
  python: [
    "Explain the difference between lists and tuples in Python.",
    "How do decorators work in Python? Can you provide an example?",
    "What is the Global Interpreter Lock (GIL) and how does it affect Python programs?",
    "Describe Python's memory management and garbage collection.",
    "How would you implement a context manager in Python?"
  ]
};

// Mock AI response function
const getAiResponse = async (messages: Message[], skill: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const skillQuestions = mockQuestions[skill.toLowerCase()] || mockQuestions.default;
      const questionIndex = Math.floor(messages.filter(m => m.type === 'ai').length);
      
      if (questionIndex < skillQuestions.length) {
        resolve(skillQuestions[questionIndex]);
      } else {
        resolve("Thank you for your detailed responses. I have enough information to complete the assessment.");
      }
    }, 1500 + Math.random() * 1000); // 1.5-2.5 second delay
  });
};

// Mock evaluation function
const getEvaluation = async (skill: string, completionTime: number, totalQuestions: number): Promise<EvaluationData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hasCode = skill.toLowerCase().includes('javascript') || 
                     skill.toLowerCase().includes('python') || 
                     skill.toLowerCase().includes('code') ||
                     skill.toLowerCase().includes('programming');
      
      resolve({
        skill,
        intellectualMetrics: {
          problemSolving: 75 + Math.random() * 20,
          reasoning: 80 + Math.random() * 15,
          clarity: 70 + Math.random() * 25,
          speed: Math.max(60, 100 - (completionTime / 60) * 10), // Speed based on completion time
          ...(hasCode && { codeQuality: 70 + Math.random() * 25 })
        },
        aiDetection: {
          plagiarismScore: Math.random() * 15,
          humanContentScore: 85 + Math.random() * 10
        },
        completionTime,
        totalQuestions
      });
    }, 3000); // 3 second analysis delay
  });
};

// Local storage utilities
const STORAGE_KEY = 'aura_assessment_history';

const saveAssessmentToHistory = (assessment: HistoricalAssessment) => {
  const existing = getAssessmentHistory();
  const updated = [assessment, ...existing].slice(0, 10); // Keep last 10 assessments
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const getAssessmentHistory = (): HistoricalAssessment[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored).map((item: any) => ({
      ...item,
      date: new Date(item.date)
    }));
  } catch {
    return [];
  }
};

const AuraInterface: React.FC = () => {
  // State management
  const [currentView, setCurrentView] = useState<View>(View.SKILL_SELECTION);
  const [skill, setSkill] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationData | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<HistoricalAssessment[]>([]);
  
  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    timeRemaining: 0,
    isActive: false,
    isPaused: false,
    totalTime: 0
  });
  const [assessmentStartTime, setAssessmentStartTime] = useState<Date | null>(null);
  
  // Code editor state
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeContent, setCodeContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load assessment history on mount
  useEffect(() => {
    setAssessmentHistory(getAssessmentHistory());
  }, []);

  // Timer effect
  useEffect(() => {
    if (timer.isActive && !timer.isPaused && timer.timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimer(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (timer.timeRemaining === 0 && timer.isActive) {
      // Time's up - force submit
      handleTimeUp();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer.isActive, timer.isPaused, timer.timeRemaining]);

  // Handle time up
  const handleTimeUp = () => {
    setTimer(prev => ({ ...prev, isActive: false }));
    if (currentView === View.ASSESSMENT) {
      finishAssessment();
    }
  };

  // Start timer
  const startTimer = (minutes: number) => {
    const totalSeconds = minutes * 60;
    setTimer({
      timeRemaining: totalSeconds,
      isActive: true,
      isPaused: false,
      totalTime: totalSeconds
    });
  };

  // Pause/Resume timer
  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  // Reset timer
  const resetTimer = () => {
    setTimer({
      timeRemaining: 0,
      isActive: false,
      isPaused: false,
      totalTime: 0
    });
  };

  // Format timer display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Focus input on skill selection view
  useEffect(() => {
    if (currentView === View.SKILL_SELECTION && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentView]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect if skill requires code editor
  const isCodeSkill = (skillName: string): boolean => {
    const codeSkills = ['javascript', 'python', 'java', 'react', 'node', 'programming', 'coding', 'development'];
    return codeSkills.some(s => skillName.toLowerCase().includes(s));
  };

  // Finish assessment helper
  const finishAssessment = async () => {
    setCurrentView(View.ANALYSIS);
    setIsAnalyzing(true);
    
    const completionTime = assessmentStartTime 
      ? Math.floor((Date.now() - assessmentStartTime.getTime()) / 1000)
      : timer.totalTime - timer.timeRemaining;
    
    const totalQuestions = messages.filter(m => m.type === 'ai').length;
    
    // Start evaluation
    const evalData = await getEvaluation(skill, completionTime, totalQuestions);
    
    // Save to history
    const historicalAssessment: HistoricalAssessment = {
      id: Date.now().toString(),
      skill,
      date: new Date(),
      evaluation: evalData,
      duration: completionTime
    };
    
    saveAssessmentToHistory(historicalAssessment);
    setAssessmentHistory(getAssessmentHistory());
    
    setEvaluation(evalData);
    setIsAnalyzing(false);
    setCurrentView(View.EVALUATION);
    
    // Stop timer
    resetTimer();
  };

  // Start assessment
  const startAssessment = async () => {
    if (!skill.trim()) return;
    
    setAssessmentStartTime(new Date());
    setCurrentView(View.ASSESSMENT);
    setIsAiThinking(true);
    
    // Start timer if it's a timed assessment
    const isCodeBased = isCodeSkill(skill);
    if (isCodeBased) {
      startTimer(30); // 30 minutes for code-based assessments
      setShowCodeEditor(true);
      setCodeLanguage(skill.toLowerCase().includes('python') ? 'python' : 'javascript');
    } else {
      startTimer(15); // 15 minutes for regular assessments
    }
    
    // Add welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hello! I'm A.U.R.A., and I'll be conducting your ${skill} skill assessment today. ${isCodeBased ? 'This assessment includes coding challenges - use the code editor when needed.' : 'I\'ll ask you several questions to evaluate your knowledge and understanding.'} Let's begin!`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Get first question
    const firstQuestion = await getAiResponse([welcomeMessage], skill);
    const questionMessage: Message = {
      id: '2',
      type: 'ai',
      content: firstQuestion,
      timestamp: new Date(),
      hasCode: isCodeBased,
      language: isCodeBased ? (skill.toLowerCase().includes('python') ? 'python' : 'javascript') : undefined
    };
    
    setMessages(prev => [...prev, questionMessage]);
    setIsAiThinking(false);
  };

  // Submit answer
  const submitAnswer = async () => {
    if ((!currentAnswer.trim() && !codeContent.trim()) || isAiThinking) return;
    
    // Combine text answer and code if both exist
    let fullAnswer = currentAnswer;
    if (codeContent.trim()) {
      fullAnswer += `\n\nCode:\n\`\`\`${codeLanguage}\n${codeContent}\n\`\`\``;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: fullAnswer,
      timestamp: new Date(),
      hasCode: !!codeContent.trim(),
      codeContent: codeContent.trim() || undefined,
      language: codeLanguage
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentAnswer('');
    setCodeContent('');
    setIsAiThinking(true);
    
    // Check if assessment should end
    const aiMessageCount = updatedMessages.filter(m => m.type === 'ai').length;
    if (aiMessageCount >= 6) { // End after 5 questions
      await finishAssessment();
      return;
    }
    
    // Get next AI response
    const aiResponse = await getAiResponse(updatedMessages, skill);
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsAiThinking(false);
  };

  // Start new assessment
  const startNewAssessment = () => {
    setCurrentView(View.SKILL_SELECTION);
    setSkill('');
    setMessages([]);
    setCurrentAnswer('');
    setCodeContent('');
    setIsAiThinking(false);
    setIsAnalyzing(false);
    setEvaluation(null);
    setShowCodeEditor(false);
    setAssessmentStartTime(null);
    resetTimer();
  };

  // Show history
  const showHistory = () => {
    setCurrentView(View.HISTORY);
    setAssessmentHistory(getAssessmentHistory());
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentView === View.SKILL_SELECTION) {
        startAssessment();
      } else if (currentView === View.ASSESSMENT) {
        submitAnswer();
      }
    }
  };

  // Timer Component
  const TimerDisplay = () => {
    if (!timer.isActive && timer.timeRemaining === 0) return null;
    
    const percentage = ((timer.totalTime - timer.timeRemaining) / timer.totalTime) * 100;
    const isUrgent = timer.timeRemaining < 300; // Last 5 minutes
    
    return (
      <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
        isUrgent ? 'bg-red-500/20 border border-red-500/30' : 'bg-aura-bg-input border border-aura-border'
      }`}>
        <Clock className={`w-4 h-4 ${isUrgent ? 'text-red-400' : 'text-aura-primary'}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${
              isUrgent ? 'text-red-400' : 'text-aura-text-primary'
            }`}>
              {formatTime(timer.timeRemaining)}
            </span>
            <div className="flex items-center space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleTimer}
                className="h-6 w-6 p-0"
              >
                {timer.isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </Button>
            </div>
          </div>
          <Progress 
            value={percentage} 
            className={`h-1 mt-1 ${isUrgent ? 'bg-red-900' : 'bg-aura-bg-dark'}`}
          />
        </div>
      </div>
    );
  };

  // Render skill selection view
  const renderSkillSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-aura-bg-dark via-aura-bg-card to-aura-bg-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-aura-card border-aura-border shadow-aura">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-aura rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-aura-text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-aura-text-primary mb-2">
              A.U.R.A.
            </CardTitle>
            <p className="text-sm text-aura-text-muted">Advanced Understanding and Responsive Agent</p>
            <p className="text-xs text-aura-text-muted mt-1">Powered by I-Intern</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="skill-input" className="text-sm font-medium text-aura-text-primary">
              What skill would you like to be assessed on?
            </label>
            <Input
              ref={inputRef}
              id="skill-input"
              type="text"
              placeholder="e.g., JavaScript, React, Python, Data Analysis..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-aura-bg-input border-aura-border text-aura-text-primary placeholder:text-aura-text-muted focus:ring-aura-primary"
            />
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={startAssessment}
              disabled={!skill.trim()}
              className="flex-1 bg-gradient-aura hover:bg-aura-primary-dark text-aura-text-primary font-medium py-2 px-4 rounded-md transition-smooth"
            >
              Start Assessment
            </Button>
            {assessmentHistory.length > 0 && (
              <Button
                onClick={showHistory}
                variant="outline"
                className="border-aura-border text-aura-text-muted hover:text-aura-text-primary hover:bg-aura-bg-input"
              >
                <History className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render assessment view
  const renderAssessment = () => (
    <div className="min-h-screen bg-aura-bg-dark flex flex-col">
      {/* Header */}
      <div className="bg-aura-bg-card border-b border-aura-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-aura-text-primary">
              {skill} Assessment
            </h1>
            <p className="text-sm text-aura-text-muted">A.U.R.A. Skill Verification</p>
          </div>
          <TimerDisplay />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-aura text-aura-text-primary'
                    : 'bg-aura-bg-card border border-aura-border text-aura-text-primary'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <Brain className="w-5 h-5 text-aura-primary mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.hasCode && message.codeContent && (
                      <div className="mt-3 bg-aura-bg-dark rounded border border-aura-border p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {message.language}
                          </Badge>
                        </div>
                        <pre className="text-sm text-aura-text-primary overflow-x-auto">
                          <code>{message.codeContent}</code>
                        </pre>
                      </div>
                    )}
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* AI thinking indicator */}
          {isAiThinking && (
            <div className="flex justify-start">
              <div className="bg-aura-bg-card border border-aura-border rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-aura-primary" />
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-aura-primary" />
                    <span className="text-sm text-aura-text-muted">A.U.R.A. is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="bg-aura-bg-card border-t border-aura-border p-4">
        <div className="max-w-4xl mx-auto">
          {showCodeEditor && (
            <Tabs defaultValue="text" className="mb-4">
              <TabsList className="grid w-full grid-cols-2 bg-aura-bg-input">
                <TabsTrigger value="text" className="data-[state=active]:bg-aura-primary data-[state=active]:text-aura-text-primary">
                  Text Response
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-aura-primary data-[state=active]:text-aura-text-primary">
                  <Code className="w-4 h-4 mr-2" />
                  Code Editor
                </TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-4">
                <div className="flex space-x-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-aura-bg-input border-aura-border text-aura-text-primary placeholder:text-aura-text-muted focus:ring-aura-primary resize-none"
                    rows={3}
                  />
                  <Button
                    onClick={submitAnswer}
                    disabled={(!currentAnswer.trim() && !codeContent.trim()) || isAiThinking}
                    className="bg-gradient-aura hover:bg-aura-primary-dark text-aura-text-primary px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="code" className="mt-4">
                <div className="space-y-4">
                  <div className="h-64 border border-aura-border rounded-lg overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage={codeLanguage}
                      language={codeLanguage}
                      value={codeContent}
                      onChange={(value) => setCodeContent(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-aura-text-muted">Language:</label>
                      <select
                        value={codeLanguage}
                        onChange={(e) => setCodeLanguage(e.target.value)}
                        className="bg-aura-bg-input border border-aura-border rounded px-2 py-1 text-sm text-aura-text-primary"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="typescript">TypeScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                      </select>
                    </div>
                    <Button
                      onClick={submitAnswer}
                      disabled={(!currentAnswer.trim() && !codeContent.trim()) || isAiThinking}
                      className="bg-gradient-aura hover:bg-aura-primary-dark text-aura-text-primary px-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Code
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          {!showCodeEditor && (
            <div className="flex space-x-4">
              <Textarea
                placeholder="Type your answer here..."
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-aura-bg-input border-aura-border text-aura-text-primary placeholder:text-aura-text-muted focus:ring-aura-primary resize-none"
                rows={3}
              />
              <Button
                onClick={submitAnswer}
                disabled={!currentAnswer.trim() || isAiThinking}
                className="bg-gradient-aura hover:bg-aura-primary-dark text-aura-text-primary px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render analysis view
  const renderAnalysis = () => (
    <div className="min-h-screen bg-gradient-to-br from-aura-bg-dark via-aura-bg-card to-aura-bg-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-aura-card border-aura-border shadow-aura">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-aura rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-aura-text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-aura-text-primary mb-2">
              Assessment Complete!
            </h2>
            <p className="text-aura-text-muted">
              A.U.R.A. is analyzing your responses and generating your detailed evaluation report.
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-aura-primary" />
            <span className="text-sm text-aura-text-muted">Analysis in progress...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render evaluation view
  const renderEvaluation = () => {
    if (!evaluation) return null;

    // Prepare radar chart data
    const radarData = [
      {
        skill: 'Problem Solving',
        score: Math.round(evaluation.intellectualMetrics.problemSolving),
        fullMark: 100
      },
      {
        skill: 'Reasoning',
        score: Math.round(evaluation.intellectualMetrics.reasoning),
        fullMark: 100
      },
      {
        skill: 'Clarity',
        score: Math.round(evaluation.intellectualMetrics.clarity),
        fullMark: 100
      },
      {
        skill: 'Speed',
        score: Math.round(evaluation.intellectualMetrics.speed),
        fullMark: 100
      }
    ];

    if (evaluation.intellectualMetrics.codeQuality) {
      radarData.push({
        skill: 'Code Quality',
        score: Math.round(evaluation.intellectualMetrics.codeQuality),
        fullMark: 100
      });
    }

    // Performance over time data for line chart
    const performanceData = assessmentHistory.slice(0, 5).reverse().map((assessment, index) => ({
      assessment: `Test ${index + 1}`,
      problemSolving: Math.round(assessment.evaluation.intellectualMetrics.problemSolving),
      reasoning: Math.round(assessment.evaluation.intellectualMetrics.reasoning),
      clarity: Math.round(assessment.evaluation.intellectualMetrics.clarity),
      speed: Math.round(assessment.evaluation.intellectualMetrics.speed)
    }));

    return (
      <div className="min-h-screen bg-aura-bg-dark p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <Card className="bg-aura-card border-aura-border shadow-aura">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-aura rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-aura-text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-aura-text-primary">
                      Detailed Evaluation Report
                    </CardTitle>
                    <p className="text-aura-text-muted">
                      Skill Assessment: <span className="text-aura-primary font-medium">{evaluation.skill}</span>
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-aura-text-muted">
                      <span>Completion Time: {Math.floor(evaluation.completionTime / 60)}m {evaluation.completionTime % 60}s</span>
                      <span>Questions: {evaluation.totalQuestions}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={showHistory}
                  variant="outline"
                  className="border-aura-border text-aura-text-muted hover:text-aura-text-primary hover:bg-aura-bg-input"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="bg-aura-card border-aura-border shadow-aura">
              <CardHeader>
                <CardTitle className="text-aura-text-primary flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-aura-primary" />
                  <span>Current Performance Breakdown</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--aura-border))" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fill: 'hsl(var(--aura-text-muted))', fontSize: 12 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--aura-text-muted))', fontSize: 10 }}
                      />
                      <Radar
                        name="Performance"
                        dataKey="score"
                        stroke="hsl(var(--aura-primary))"
                        fill="hsl(var(--aura-primary))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Historical Performance */}
            {performanceData.length > 1 && (
              <Card className="bg-aura-card border-aura-border shadow-aura">
                <CardHeader>
                  <CardTitle className="text-aura-text-primary flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-aura-primary" />
                    <span>Performance Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--aura-border))" />
                        <XAxis 
                          dataKey="assessment" 
                          tick={{ fill: 'hsl(var(--aura-text-muted))', fontSize: 12 }}
                        />
                        <YAxis 
                          domain={[0, 100]}
                          tick={{ fill: 'hsl(var(--aura-text-muted))', fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'hsl(var(--aura-bg-card))',
                            border: '1px solid hsl(var(--aura-border))',
                            borderRadius: '8px',
                            color: 'hsl(var(--aura-text-primary))'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="problemSolving" 
                          stroke="hsl(var(--aura-primary))" 
                          strokeWidth={2}
                          name="Problem Solving"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="reasoning" 
                          stroke="hsl(var(--aura-primary-light))" 
                          strokeWidth={2}
                          name="Reasoning"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="clarity" 
                          stroke="hsl(var(--aura-primary-dark))" 
                          strokeWidth={2}
                          name="Clarity"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Intellectual Assessment */}
            <Card className="bg-aura-card border-aura-border shadow-aura">
              <CardHeader>
                <CardTitle className="text-aura-text-primary flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-aura-primary" />
                  <span>Intellectual Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-aura-text-primary">Problem Solving</span>
                      <span className="text-sm text-aura-text-muted">
                        {Math.round(evaluation.intellectualMetrics.problemSolving)}%
                      </span>
                    </div>
                    <Progress 
                      value={evaluation.intellectualMetrics.problemSolving} 
                      className="h-2 bg-aura-bg-input"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-aura-text-primary">Reasoning & Logic</span>
                      <span className="text-sm text-aura-text-muted">
                        {Math.round(evaluation.intellectualMetrics.reasoning)}%
                      </span>
                    </div>
                    <Progress 
                      value={evaluation.intellectualMetrics.reasoning} 
                      className="h-2 bg-aura-bg-input"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-aura-text-primary">Clarity of Explanation</span>
                      <span className="text-sm text-aura-text-muted">
                        {Math.round(evaluation.intellectualMetrics.clarity)}%
                      </span>
                    </div>
                    <Progress 
                      value={evaluation.intellectualMetrics.clarity} 
                      className="h-2 bg-aura-bg-input"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-aura-text-primary">Response Speed</span>
                      <span className="text-sm text-aura-text-muted">
                        {Math.round(evaluation.intellectualMetrics.speed)}%
                      </span>
                    </div>
                    <Progress 
                      value={evaluation.intellectualMetrics.speed} 
                      className="h-2 bg-aura-bg-input"
                    />
                  </div>

                  {evaluation.intellectualMetrics.codeQuality && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-aura-text-primary">Code Quality</span>
                        <span className="text-sm text-aura-text-muted">
                          {Math.round(evaluation.intellectualMetrics.codeQuality)}%
                        </span>
                      </div>
                      <Progress 
                        value={evaluation.intellectualMetrics.codeQuality} 
                        className="h-2 bg-aura-bg-input"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Content Detection */}
            <Card className="bg-aura-card border-aura-border shadow-aura">
              <CardHeader>
                <CardTitle className="text-aura-text-primary flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-aura-primary" />
                  <span>AI Content Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-aura-bg-input rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-400">
                        {Math.round(evaluation.aiDetection.plagiarismScore)}%
                      </p>
                      <p className="text-sm text-aura-text-muted">AI Plagiarism Score</p>
                    </div>
                  </div>
                  
                  <div className="bg-aura-bg-input rounded-lg p-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">
                        {Math.round(evaluation.aiDetection.humanContentScore)}%
                      </p>
                      <p className="text-sm text-aura-text-muted">Human-Written Content</p>
                    </div>
                  </div>
                </div>
                
                {evaluation.aiDetection.humanContentScore > 80 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">
                        Verified Human Content
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={startNewAssessment}
              className="bg-gradient-aura hover:bg-aura-primary-dark text-aura-text-primary px-8 py-3"
            >
              Start New Assessment
            </Button>
            <Button
              onClick={showHistory}
              variant="outline"
              className="border-aura-border text-aura-text-muted hover:text-aura-text-primary hover:bg-aura-bg-input px-8 py-3"
            >
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Render history view
  const renderHistory = () => (
    <div className="min-h-screen bg-aura-bg-dark p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-aura-card border-aura-border shadow-aura">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-aura-text-primary flex items-center space-x-2">
                <History className="w-5 h-5 text-aura-primary" />
                <span>Assessment History</span>
              </CardTitle>
              <Button
                onClick={() => setCurrentView(View.SKILL_SELECTION)}
                variant="outline"
                className="border-aura-border text-aura-text-muted hover:text-aura-text-primary hover:bg-aura-bg-input"
              >
                Back to Home
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {assessmentHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-aura-text-muted">No assessments completed yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {assessmentHistory.map((assessment) => (
                  <div key={assessment.id} className="bg-aura-bg-input rounded-lg p-4 border border-aura-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-aura-text-primary">{assessment.skill}</h3>
                        <p className="text-sm text-aura-text-muted">
                          {assessment.date.toLocaleDateString()} • {Math.floor(assessment.duration / 60)}m {assessment.duration % 60}s
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-aura-primary">
                          {Math.round((assessment.evaluation.intellectualMetrics.problemSolving + 
                                     assessment.evaluation.intellectualMetrics.reasoning + 
                                     assessment.evaluation.intellectualMetrics.clarity) / 3)}%
                        </p>
                        <p className="text-xs text-aura-text-muted">Average Score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Main render
  switch (currentView) {
    case View.SKILL_SELECTION:
      return renderSkillSelection();
    case View.ASSESSMENT:
      return renderAssessment();
    case View.ANALYSIS:
      return renderAnalysis();
    case View.EVALUATION:
      return renderEvaluation();
    case View.HISTORY:
      return renderHistory();
    default:
      return renderSkillSelection();
  }
};

export default AuraInterface;



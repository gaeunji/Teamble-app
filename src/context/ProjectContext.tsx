import React, { createContext, useContext, useState } from "react";
import { Project } from "../types/project";

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const defaultProjects: Project[] = [
  {
    id: "1",
    category: "웹개발",
    title: "웹개발 프로젝트",
    members: 8,
    description: "React + Node.js 쇼핑몰 개발",
    message: "내일까지 각자 담당 부분 완료해주세요!",
    time: "오후 12:30",
    badge: 3,
    color: "#3B82F5",
  },
  {
    id: "2",
    category: "모바일",
    title: "모바일 앱 기획",
    members: 5,
    description: "Flutter 기반 배달앱 기획",
    message: "내일 회의 시간 조정 가능하신가요?",
    time: "오후 16:30",
    badge: 2,
    color: "#FACC15",
  },
  {
    id: "3",
    category: "세계와 시민",
    title: "세계와 시민",
    members: 4,
    description: "장애인 이동권",
    message: "자료조사 결과 공유 드립니다.",
    time: "오전 11:30",
    badge: 1,
    color: "#22C55E",
  },
  {
    id: "4",
    category: "AI/ML",
    title: "AI 프로젝트",
    members: 6,
    description: "머신러닝 모델 개발",
    message: "데이터 전처리 완료했습니다.",
    time: "어제",
    color: "#8B5CF6",
  },
  {
    id: "5",
    category: "게임",
    title: "게임 개발팀",
    members: 7,
    description: "Unity 3D 게임 개발",
    message: "버그 수정 완료했습니다.",
    time: "3일 전",
    color: "#EC4899",
  },
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within ProjectProvider");
  return context;
}; 
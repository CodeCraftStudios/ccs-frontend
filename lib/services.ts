import { SERVER_ENDPOINT } from './consts';

export interface StackItem {
  id: number;
  name: string;
  slug: string;
  logo: string;
}

export interface Feature {
  id: number;
  feature: string;
  service: number;
}

export interface ServiceImage {
  id: number;
  title: string;
  caption: string;
  image: string;
  service: number;
}

export interface Service {
  id: number;
  name: string;
  icon: string;
  features: Feature[];
  stack: StackItem[];
  images: ServiceImage[];
  slug: string;
  short_description: string;
  overview: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export interface ServicesResponse {
  data: Service[];
}

// Server-side fetch function for SSR
export async function fetchServices(): Promise<Service[]> {
  try {
    console.log('Fetching services from:', `${SERVER_ENDPOINT}/api/service/list`);
    const response = await fetch(`${SERVER_ENDPOINT}/api/service/list`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch services:', response.status);
      return getDefaultServices();
    }

    const data: ServicesResponse = await response.json();
    console.log('Fetched services:', data.data.length, 'services');
    console.log('Service names:', data.data.map(s => s.name));
    return data.data; // All services from the API
  } catch (error) {
    console.error('Error fetching services:', error);
    console.log('Using default services as fallback');
    return getDefaultServices();
  }
}

// Fallback default services in case API is unavailable
function getDefaultServices(): Service[] {
  return [
    {
      id: 1,
      name: "Web Development",
      icon: "/media/services/icons/code-xml.svg",
      features: [],
      stack: [],
      images: [],
      slug: "web-development",
      short_description: "Custom websites built with modern technologies and best practices.",
      overview: "Transform your online presence with modern web development that converts visitors into customers.",
    },
    {
      id: 2,
      name: "App Development",
      icon: "/media/services/icons/tablet-smartphone.svg",
      features: [],
      stack: [],
      images: [],
      slug: "app-development",
      short_description: "Get a professional, efficient, secure, and compatible app.",
      overview: "Build once, deploy everywhere with React Native expertise.",
    },
    {
      id: 3,
      name: "API Development",
      icon: "/media/services/icons/network.svg",
      features: [],
      stack: [],
      images: [],
      slug: "api-development",
      short_description: "Get a scalable, fast, and secure REST API.",
      overview: "Robust, scalable REST APIs built with Django.",
    },
    {
      id: 4,
      name: "SEO Marketing",
      icon: "/media/services/icons/chart-no-axes-combined.svg",
      features: [],
      stack: [],
      images: [],
      slug: "seo-marketing",
      short_description: "Boost your organic traffic with our team.",
      overview: "Data-driven SEO strategies that increase organic traffic and conversions.",
    },
    {
      id: 5,
      name: "Game Development",
      icon: "/media/services/icons/gamepad-2.svg",
      features: [],
      stack: [],
      images: [],
      slug: "game-development",
      short_description: "Get a video game with features like VR, Multiplayer, and more",
      overview: "Professional game development across all platforms using Unity and Unreal.",
    },
  ];
}
export interface SkillCategory {
  categorydescription: string;
  categoryArray: {
    name: string;
    fieldOfWork: string[];
    iconLink: string;
    progress: string;
  }[];
}

export type SkillItems = {
  [key: string]: SkillCategory;
};

export const skillItems: SkillItems = {
  Webdesign: {
    categorydescription:
      'I am always learning about the newest advancements in the world of web development.',
    categoryArray: [
      {
        name: 'HTML',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/html.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'CSS',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/css.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'TailwindCSS',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/tailwindcss.svg',
        progress: 'w-[50.5%] ',
      },
      {
        name: 'Typescript',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/typescript.svg',
        progress: 'w-[50.5%] ',
      },
      {
        name: 'Svelte',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/svelte.svg',
        progress: 'w-[35.5%] ',
      },
      {
        name: 'Wordpress',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/wordpress.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'Github',
        fieldOfWork: ['webdev'],
        iconLink: 'skills-icons/github.svg',
        progress: 'w-[75.5%] ',
      },
    ]
  },

  'Product Design – 3D Modelling': {
    categorydescription: 'Coming up with creative and smart product solutions is my passion.',
    categoryArray: [
      {
        name: 'AD Fusion 360',
        fieldOfWork: ['productdesign'],
        iconLink: 'skills-icons/autodesk-fusion-360.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'AD 3DS Max',
        fieldOfWork: ['productdesign'],
        iconLink: 'skills-icons/autodesk-3ds.svg',
        progress: 'w-[50.5%] ',
      }
    ]
  },
  'Graphic & Logo Design': {
    categorydescription:
      'All the important tools to provide assets for most graphic design needs.',
    categoryArray: [
      {
        name: 'Affinity Photo',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/AffinityPhoto.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'Adobe Photoshop',
        fieldOfWork: ['graphic'],
        iconLink: 'skills-icons/adobe-photoshop.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'Affinity Designer',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/AffinityDesigner.svg',
        progress: 'w-[100.5%] ',
      },
      {
        name: 'Adobe Illustrator',
        fieldOfWork: ['graphic'],
        iconLink: 'skills-icons/adobe-illustrator.svg',
        progress: 'w-[100.5%] ',
      },
      {
        name: 'Affinity Publisher',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/AffinityPublisher.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'Adobe InDesign',
        fieldOfWork: ['graphic'],
        iconLink: 'skills-icons/adobe-indesign.svg',
        progress: 'w-[75.5%] ',
      },
      {
        name: 'Figma',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/figma2.svg',
        progress: 'w-[25.5%] ',
      }
    ]
  },
  'Language Skills': {
    categorydescription:
      'The set of languages i am fluent with, i can help you reach the broadest audience in the western world',
    categoryArray: [
      {
        name: 'German',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/de.svg',
        progress: 'Native',
      },
      {
        name: 'Spanish',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/es.svg',
        progress: 'Native',
      },
      {
        name: 'English',
        fieldOfWork: ['webdev', 'graphic'],
        iconLink: 'skills-icons/gb.svg',
        progress: 'Bilingual',
      }
    ]
  }
};
import { IconType } from "react-icons/lib";
import { LuUndo,LuRedo } from "react-icons/lu";
import React from 'react'
import { LucideIcon } from "lucide-react";
import { useEditorStore } from "../store/use-editor-store";
import { IoPrintOutline } from "react-icons/io5";
import { TbTextSpellcheck } from "react-icons/tb";
import { HiBold } from "react-icons/hi2";
import { PiTextItalicBold } from "react-icons/pi";
import { ImUnderline } from "react-icons/im";
import { LuStrikethrough } from "react-icons/lu";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiCodeBlock } from "react-icons/ri";
import { TbBlockquote } from "react-icons/tb";
import { IoCodeSlash } from "react-icons/io5";
import { LuMessagesSquare } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import { FaRemoveFormat } from "react-icons/fa";

export const useSections = () => {
    const { editor } = useEditorStore();
    
    const sections: {
        label: string; 
        onClick?: () => void;
        isActive?: boolean;
        icon: LucideIcon | IconType | React.ElementType;
    }[][] = [
        [
            {
                label: 'Undo',
                icon: LuUndo,
                onClick: () => editor?.chain().focus().undo().run()
            },
            {
                label: 'Redo',
                icon: LuRedo,
                onClick: () => editor?.chain().focus().redo().run()
            },
            {
                label: 'Print',
                icon: IoPrintOutline,
                onClick: () => window.print()
            },
            {
                label: 'Spell Check',
                icon: TbTextSpellcheck,
                onClick: () => {
                    const current = editor?.view.dom.getAttribute("spellcheck")
                    editor?.view.dom.setAttribute("spellcheck",current === "false" ? "true" : "false")
                }
            },
        ],[
            
            {
                label: 'Bold',
                icon: HiBold,
                isActive:editor?.isActive("bold"),
                onClick: () => editor?.chain().focus().toggleBold().run()
            },   
            {
                label: 'Italicize',
                icon: PiTextItalicBold,
                isActive:editor?.isActive("italic"),
                onClick: () => editor?.chain().focus().toggleItalic().run()
            },   
            {
                label: 'Underline',
                icon: ImUnderline,
                isActive:editor?.isActive("underline"),
                onClick: () => editor?.chain().focus().toggleUnderline().run()
            },   
            {
                label: 'Strikethrough',
                icon: LuStrikethrough,
                isActive:editor?.isActive("strikethrough"),
                onClick: () => editor?.chain().focus().toggleStrike().run()
            },   
            {
                label: 'Block Quote',
                icon: TbBlockquote,
                isActive:editor?.isActive("blockqoute"),
                onClick: () => editor?.chain().focus().toggleBlockquote().run()
            },   
            {
                label: 'Code Block',
                icon: RiCodeBlock,
                isActive:editor?.isActive("codeBlock"),
                onClick: () => editor?.chain().focus().toggleCodeBlock().run()
            },   
            {
                label: 'Bulletin',
                icon: MdFormatListBulletedAdd,
                isActive:editor?.isActive("bulletList"),
                onClick: () => editor?.chain().focus().toggleBulletList().run()
            },   
            {
                label: 'Code',
                icon: IoCodeSlash,
                isActive:editor?.isActive("code"),
                onClick: () => editor?.chain().focus().toggleCode().run()
            },   
        ],[
            {
                label: 'Message',
                icon: LuMessagesSquare,
                onClick: () => editor?.chain().focus().addPendingComment().run(),
                isActive:editor?.isActive("liveblocksCommentMark"),
            },  
            {
                label: 'Task List',
                icon: GoTasklist,
                isActive:editor?.isActive("taskList"),
                onClick: () => editor?.chain().focus().toggleTaskList().run()
            },  
            {
                label: 'Remove Formatting',
                icon: FaRemoveFormat,
                onClick: () => editor?.chain().focus().unsetAllMarks().run()
            },  
        ]
    ];

    return sections;
}

export const templates = [
    {
    id:'blank',
    label:'Blank Trail',
    imageUrl:'/blank-document.svg',
    initialContent:``
},
    {
    id:'sofware-proposal',
    label:'Software proposal',
    imageUrl:'/software-proposal.svg' 
    ,initialContent:` <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <div style="text-align: center; margin-bottom: 3rem;">
    <h1 style="font-size: 2.5rem; color: #2563eb; margin-bottom: 1rem;">Software Development Proposal</h1>
    <p style="font-size: 1.25rem; color: #666;">[Your Company Name]</p>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Executive Summary</h2>
    <p>Outline the key points of your proposal here, including the problem you're solving and your proposed solution.</p>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Project Scope</h2>
    <p>Define the boundaries of the project, including:</p>
    <ul>
      <li>Key features and functionalities</li>
      <li>Technical requirements</li>
      <li>Integration points</li>
      <li>Deliverables</li>
    </ul>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Timeline & Milestones</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Phase</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Duration</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Deliverables</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Discovery & Planning</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">2 weeks</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Project plan, Technical specifications</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Development</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">8 weeks</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">MVP, Beta release</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Testing & QA</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">2 weeks</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Test reports, Bug fixes</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Deployment</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">1 week</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Production release</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Budget</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Item</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Development</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">$[Amount]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Testing</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">$[Amount]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Infrastructure</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">$[Amount]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;"><strong>Total</strong></td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;"><strong>$[Total Amount]</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Team & Resources</h2>
    <ul>
      <li>Project Manager: [Name]</li>
      <li>Lead Developer: [Name]</li>
      <li>UX Designer: [Name]</li>
      <li>QA Engineer: [Name]</li>
    </ul>
  </div>

  <div style="margin-bottom: 2rem;">
    <h2 style="font-size: 1.5rem; color: #1e40af; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem;">Terms & Conditions</h2>
    <p>Specify your terms and conditions here, including payment terms, intellectual property rights, and warranty information.</p>
  </div>
</div>`
},
{
    id:'project',
    label:'Project',
    imageUrl:'/project-proposal.svg'
    ,initialContent:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; border-radius: 1rem;">
    <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">Project Plan</h1>
    <p style="font-size: 1.25rem; opacity: 0.9;">Strategic Implementation Roadmap</p>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="font-size: 1.5rem; color: #4f46e5; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="content: ''; display: block; width: 4px; height: 24px; background: #4f46e5; border-radius: 2px;"></span>
      Project Overview
    </h2>
    <p><strong>Project Name:</strong> [Project Name]</p>
    <p><strong>Project Manager:</strong> [Name]</p>
    <p><strong>Start Date:</strong> [Date]</p>
    <p><strong>Expected Completion:</strong> [Date]</p>
    <p><strong>Project Description:</strong></p>
    <p>Provide a brief overview of the project, its objectives, and expected outcomes.</p>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="font-size: 1.5rem; color: #4f46e5; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="content: ''; display: block; width: 4px; height: 24px; background: #4f46e5; border-radius: 2px;"></span>
      Goals & Objectives
    </h2>
    <ul>
      <li>Primary Goal 1</li>
      <li>Primary Goal 2</li>
      <li>Primary Goal 3</li>
    </ul>
    <p><strong>Success Metrics:</strong></p>
    <ul>
      <li>Metric 1</li>
      <li>Metric 2</li>
      <li>Metric 3</li>
    </ul>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="font-size: 1.5rem; color: #4f46e5; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="content: ''; display: block; width: 4px; height: 24px; background: #4f46e5; border-radius: 2px;"></span>
      Timeline & Milestones
    </h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Milestone</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Due Date</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Status</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Owner</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Project Kickoff</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Date]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;"><span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; background-color: #dcfce7; color: #166534;">Completed</span></td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Phase 1 Delivery</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Date]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;"><span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; background-color: #dbeafe; color: #1e40af;">In Progress</span></td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Phase 2 Delivery</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Date]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;"><span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; background-color: #fef3c7; color: #92400e;">Pending</span></td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="margin-bottom: 2rem; padding: 1.5rem; background: #fff; border-radius: 0.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="font-size: 1.5rem; color: #4f46e5; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
      <span style="content: ''; display: block; width: 4px; height: 24px; background: #4f46e5; border-radius: 2px;"></span>
      Resource Allocation
    </h2>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <thead>
        <tr>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Role</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Name</th>
          <th style="border: 1px solid #e5e7eb; padding: 0.75rem; background-color: #f3f4f6;">Time Allocation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Project Manager</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">100%</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Developer</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">75%</td>
        </tr>
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">Designer</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">[Name]</td>
          <td style="border: 1px solid #e5e7eb; padding: 0.75rem;">50%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
},
{
    id:'cover',
    label:'Cover letter',
    imageUrl:'/cover-letter.svg'
    ,initialContent:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <div style="margin-bottom: 2rem;">
    <h1 style="color: #2563eb; font-size: 1.5rem; margin-bottom: 1rem;">[Your Full Name]</h1>
  </div>
  
  <div style="text-align: right; margin-bottom: 2rem;">
    [Your Address]<br>
    [City, State ZIP]<br>
    [Phone Number]<br>
    [Email]
  </div>
  
  <div style="margin-bottom: 2rem;">
    [Current Date]
  </div>
  
  <div style="margin-bottom: 2rem;">
    [Hiring Manager's Name]<br>
    [Company Name]<br>
    [Company Address]<br>
    [City, State ZIP]
  </div>
  
  <div style="margin-bottom: 2rem;">
    <div style="margin-bottom: 1.5rem;">
      Dear [Hiring Manager's Name],
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      I am writing to express my strong interest in the [Position] role at [Company Name]. With my background in [relevant field/experience], I am confident in my ability to contribute effectively to your team.
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      In my current role at [Current/Previous Company], I have [specific achievement or responsibility]. This experience has helped me develop strong skills in [relevant skills], which align perfectly with the requirements outlined in your job posting.
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      I am particularly drawn to [Company Name] because of [specific reason, e.g., company values, projects, innovation]. Your company's commitment to [specific aspect] resonates with my professional goals and values.
    </div>
    
    <div style="margin-bottom: 1.5rem;">
      I would welcome the opportunity to discuss how my skills and experience could benefit [Company Name]. Thank you for considering my application.
    </div>
  </div>
  
  <div style="margin-top: 2rem;">
    Sincerely,<br>
    [Your Full Name]
  </div>
</div>`
},
{
    id:'resume',
    label:'Resume',
    imageUrl:'/resume.svg'
    ,initialContent:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <div style="text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #2563eb;">
    <div style="font-size: 2.5rem; color: #2563eb; margin-bottom: 0.5rem;">[Your Name]</div>
    <div style="color: #666;">
      [Phone] • [Email] • [Location]<br>
      [LinkedIn] • [Portfolio]
    </div>
  </div>

  <div style="margin-bottom: 2rem;">
    <div style="font-size: 1.25rem; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Professional Summary</div>
    <p>[Brief professional summary highlighting your key qualifications and career objectives]</p>
  </div>

  <div style="margin-bottom: 2rem;">
    <div style="font-size: 1.25rem; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Experience</div>
    
    <div style="margin-bottom: 1.5rem;">
      <div style="font-weight: bold; margin-bottom: 0.25rem;">[Job Title]</div>
      <div style="color: #2563eb; margin-bottom: 0.25rem;">[Company Name]</div>
      <div style="color: #666; font-size: 0.9rem;">[Start Date] - [End Date]</div>
      <ul>
        <li>[Achievement or responsibility 1]</li>
        <li>[Achievement or responsibility 2]</li>
        <li>[Achievement or responsibility 3]</li>
      </ul>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <div style="font-weight: bold; margin-bottom: 0.25rem;">[Previous Job Title]</div>
      <div style="color: #2563eb; margin-bottom: 0.25rem;">[Previous Company Name]</div>
      <div style="color: #666; font-size: 0.9rem;">[Start Date] - [End Date]</div>
      <ul>
        <li>[Achievement or responsibility 1]</li>
        <li>[Achievement or responsibility 2]</li>
        <li>[Achievement or responsibility 3]</li>
      </ul>
    </div>
  </div>

  <div style="margin-bottom: 2rem;">
    <div style="font-size: 1.25rem; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Education</div>
    <div style="margin-bottom: 1.5rem;">
      <div style="font-weight: bold; margin-bottom: 0.25rem;">[Degree]</div>
      <div style="color: #2563eb; margin-bottom: 0.25rem;">[University Name]</div>
      <div style="color: #666; font-size: 0.9rem;">[Graduation Year]</div>
      <p>[Additional details, honors, relevant coursework]</p>
    </div>
  </div>

  <div style="margin-bottom: 2rem;">
    <div style="font-size: 1.25rem; color: #2563eb; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem;">Skills</div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 1]</span>
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 2]</span>
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 3]</span>
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 4]</span>
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 5]</span>
      <span style="background: #e5e7eb; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem;">[Skill 6]</span>
    </div>
  </div>
</div>`
},
{
    id:'letter',
    label:'Letter  ',
    imageUrl:'/letter.svg'
    ,initialContent:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; background-color: #fff;">
  <div style="text-align: right; margin-bottom: 3rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
    <div style="color: #4b5563;">
      [Your Name]<br>
      [Your Address]<br>
      [City, State ZIP]<br>
      [Phone Number]<br>
      [Email]
    </div>
  </div>

  <div style="margin: 2rem 0;">
    [Month Day, Year]
  </div>

  <div style="margin-bottom: 2rem;">
    [Recipient's Name]<br>
    [Title/Department]<br>
    [Company/Organization]<br>
    [Street Address]<br>
    [City, State ZIP]
  </div>

  <div style="font-weight: 600; margin: 2rem 0;">
    Subject: [Letter Topic or Reference]
  </div>

  <div style="margin: 2rem 0;">
    <div style="margin-bottom: 1.5rem;">
      Dear [Recipient's Name],
    </div>

    <div style="margin-bottom: 2rem;">
      <p style="margin: 1rem 0;">
        I am writing regarding [purpose of the letter]. This correspondence serves to [specific intent or purpose].
      </p>
      <p style="margin: 1rem 0;">
        [Main content of the letter. Explain your purpose, provide necessary details, and present your points clearly and concisely.]
      </p>
      <p style="margin: 1rem 0;">
        [Additional paragraphs as needed. Each paragraph should focus on a single main point or idea.]
      </p>
      <p style="margin: 1rem 0;">
        [Concluding paragraph. Summarize your main points and indicate any expected actions or responses.]
      </p>
    </div>

    <div style="margin-top: 2rem;">
      Sincerely,
    </div>

    <div style="margin-top: 3rem;">
      [Your handwritten signature]
      <div style="margin-top: 2rem; font-weight: 500;">
        [Your typed name]<br>
        [Your Title]<br>
        [Your Organization]
      </div>
    </div>

    <div style="margin-top: 2rem; color: #6b7280; font-size: 0.9rem;">
      Enclosures: [List any enclosed documents]
    </div>
  </div>
</div>`
},
{
    id:'business-letter',
    label:'Business Letter  ',
    imageUrl:'/business-letter.svg'
    ,initialContent:`<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 0 auto; padding: 2rem;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; padding-bottom: 1rem; border-bottom: 2px solid #0f172a;">
    <div style="font-size: 1.5rem; font-weight: bold; color: #0f172a;">
      [Company Logo]<br>
      [Company Name]
    </div>
    <div style="text-align: right; font-size: 0.9rem; color: #475569;">
      [Company Address]<br>
      [City, State ZIP]<br>
      Tel: [Phone Number]<br>
      Email: [Email]<br>
      Web: [Website]
    </div>
  </div>

  <div style="margin: 2rem 0; color: #64748b; font-size: 0.9rem;">
    Ref: <span style="font-weight: 600; color: #0f172a;">[Reference Number]</span><br>
    Our Ref: [Internal Reference]<br>
    Your Ref: [Client Reference]
  </div>

  <div style="margin: 2rem 0;">
    [Month Day, Year]
  </div>

  <div style="text-transform: uppercase; color: #dc2626; font-size: 0.8rem; font-weight: 600; margin: 1rem 0;">
    Confidential
  </div>

  <div style="margin-bottom: 2rem;">
    [Recipient's Name]<br>
    [Title]<br>
    [Company Name]<br>
    [Street Address]<br>
    [City, State ZIP]
  </div>

  <div style="font-weight: 600; margin: 2rem 0; color: #0f172a; font-size: 1.1rem;">
    Re: [Business Matter or Transaction Reference]
  </div>

  <div style="margin: 2rem 0;">
    <div style="margin-bottom: 1.5rem;">
      Dear [Mr./Ms. Last Name],
    </div>

    <div style="margin-bottom: 2rem;">
      <p style="margin: 1rem 0;">
        I am writing regarding [specific business matter]. This letter serves to [state primary purpose].
      </p>

      <p style="margin: 1rem 0;">
        [First main point or business proposal. Include specific details, numbers, or terms as appropriate.]
      </p>

      <p style="margin: 1rem 0;">
        [Second point or additional information. Reference any attachments or enclosed documents.]
      </p>

      <p style="margin: 1rem 0;">
        [Closing paragraph with clear call to action or next steps. Include timeline if applicable.]
      </p>
    </div>

    <div style="margin-top: 2rem;">
      Yours sincerely,
    </div>

    <div style="margin-top: 3rem;">
      [Digital Signature]
      <div style="margin-top: 2rem; font-weight: 500;">
        [Your Full Name]
        <div style="color: #475569; font-size: 0.9rem;">
          [Your Title]<br>
          [Department/Division]<br>
          [Company Name]
        </div>
      </div>
    </div>

    <div style="margin-top: 2rem; font-size: 0.9rem; color: #64748b;">
      CC: [Name, Title]<br>
      [Name, Title]
    </div>
  </div>

  <div style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #64748b;">
    [Company Registration Number] | [VAT Number]<br>
    Registered Office: [Address]<br>
    This communication is confidential and intended solely for the addressee.
  </div>
</div>`
},
]


export const getCleanErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      // Extract message between "ConvexError:" and "at handler"
      const match = error.message.match(/ConvexError: (.*?)(?= at handler|\s*$)/);
      if (match && match[1]) {
        return match[1].trim();
      }
      return error.message;
    }
    return 'An unexpected error occurred';
  };


  export  const generateUserColor = () => {
    // Predefined hues that work well for user colors
    const hues = [210, 270, 330, 30, 120, 180, 240, 300];
    
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const saturation = 80; // Fixed saturation for consistency
    const lightness = 55; // Fixed lightness for good contrast
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }; 


"use client";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LuUndo, LuRedo } from "react-icons/lu";
import {
  DownloadIcon,
  Edit2Icon,
  FilePlus,
  PrinterIcon,
  RemoveFormattingIcon,
  Table,
  TextIcon,
  TrashIcon,
} from "lucide-react";
import { GrDocumentPdf, GrDocumentText } from "react-icons/gr";
import { LuFileJson } from "react-icons/lu";
import { PiFileHtmlDuotone } from "react-icons/pi";
import { Input } from "../ui/input";
import { HiBold } from "react-icons/hi2";
import { PiTextItalicBold } from "react-icons/pi";
import { ImUnderline } from "react-icons/im";
import { LuStrikethrough } from "react-icons/lu";
import { useEditorStore } from "@/store/use-editor-store";
import { Button } from "../ui/button";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import  { PDFExportOptions} from '@/types' 
import { toast } from "sonner";

export const MenuBar = () => {
    const { editor } = useEditorStore();
    const [rows, setRows] = useState<number>(2); // Default to 2x2 table
    const [cols, setCols] = useState<number>(2);
  
    const handleInputClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };
  
    const insertTable = (rows: number, cols: number) => {
      if (!editor) return;
      
      // Validate input ranges
      const validRows = Math.min(Math.max(1, rows), 100);
      const validCols = Math.min(Math.max(1, cols), 100);
      
      try {
        editor
          .chain()
          .focus()
          .insertTable({ 
            rows: validRows, 
            cols: validCols, 
            withHeaderRow: false 
          })
          .run();
      } catch (error) {
        console.error('Error inserting table:', error);
      }
    };
  
    const handleCustomTableInsert = () => {
      if (rows && cols && rows > 0 && cols > 0) {
        insertTable(rows, cols);
      }
    };
  
    const handleNumericInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      setter: (value: number) => void
    ) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setter(value);
      }
    };

    const onDownload = (blob:Blob,filename:string) =>{
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
    }
  

    const onExpToJSON =()=>{
        if(!editor) return

        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)],{
            type:"application/json"
        })
        onDownload(blob,`download.json`)
    }
    
    const onExpToHTML =()=>{
        if(!editor) return

        const content = editor.getHTML()
        const blob = new Blob([content],{
            type:"text/html"
        })
        onDownload(blob,`download.html`)
    }
    
    const exportToPDF = async (
        editor: any,
        options: PDFExportOptions = {}
      ) => {
        if (!editor) {
          throw new Error('Editor instance is required');
        }
      
        try {
          // Get the editor content container
          const editorContent = document.querySelector('.ProseMirror');
          if (!editorContent) {
            throw new Error('Editor content element not found');
          }
      
          // Default options
          const {
            filename = 'document.pdf',
            margin = 10,
            quality = 2,
            scale = 2
          } = options;
      
          // Create canvas from editor content
          const canvas = await html2canvas(editorContent as HTMLElement, {
            scale: scale, // Higher scale for better quality
            useCORS: true, // Handle external images
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: editorContent.scrollWidth,
            windowHeight: editorContent.scrollHeight
          });
      
          // Calculate dimensions
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Create PDF
          const pdf = new jsPDF('p', 'mm', 'a4');
          let position = margin;
      
          // Add image to PDF
          pdf.addImage(
            canvas.toDataURL('image/jpeg', quality), 
            'JPEG', 
            margin, 
            position, 
            imgWidth - (margin * 2), 
            imgHeight - (margin * 2)
          );
      
          // Handle multiple pages if content is too long
          let heightLeft = imgHeight - pageHeight;
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(
              canvas.toDataURL('image/jpeg', quality),
              'JPEG',
              margin,
              position,
              imgWidth - (margin * 2),
              imgHeight - (margin * 2)
            );
            heightLeft -= pageHeight;
          }
      
          return pdf;
        } catch (error) {
          console.error('Error generating PDF:', error);
          throw error;
        }
      };
      
      // Usage example:
    //   const onExportToPDF = async () => {
    //     if (!editor) return;
      
    //     try {
    //       const loadingToast = toast.loading('Generating PDF...');
          
    //       const pdf = await exportToPDF(editor, {
    //         filename: 'document.pdf',
    //         margin: 10,
    //         quality: 2,
    //         scale: 2
    //       });
      
    //       // Download the PDF
    //       pdf.save('document.pdf');
          
    //       toast.dismiss(loadingToast);
    //       toast.success('PDF downloaded successfully');
    //     } catch (error) {
    //       toast.error('Failed to generate PDF');
    //       console.error('PDF generation error:', error);
    //     }
    //   };
      
      // If you need to handle the PDF as a blob instead:
      const onExportToPDFAsBlob = async () => {
        if (!editor) return;
      
        try {
          const pdf = await exportToPDF(editor);
          const blob = pdf.output('blob');
          onDownload(blob, 'document.pdf');
        } catch (error) {
          console.error('Error generating PDF blob:', error);
          toast.error('Failed to generate PDF');
        }
      };
    // ... existing code ...

    const onExpToTXT =()=>{
        if(!editor) return

        const content = editor.getText()
        const blob = new Blob([content],{
            type:"text/plain"
        })
        onDownload(blob,`download.txt`)
    }


  return (
    <div className="flex">
      <Menubar className="p-0 bg-transparent h-auto shadow-none border-none">
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
            File
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
                <DownloadIcon className="size-4" />
                Export{" "}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="flex items-center gap-2"
                onClick={onExpToJSON}
                >
                  <LuFileJson className="size-4" />
                  JSON
                </MenubarItem>

                <MenubarItem className="flex items-center gap-2"
                onClick={onExpToHTML}
                >
                  <PiFileHtmlDuotone className="size-4" />
                  HTML
                </MenubarItem>

                <MenubarItem className="flex items-center gap-2"
                // onClick={onExportToPDF}
                onClick={onExportToPDFAsBlob}
                >
                  <GrDocumentPdf className="size-4" />
                  PDF
                </MenubarItem>

                <MenubarItem className="flex items-center gap-2"
                    onClick={onExpToTXT}

                >
                  <GrDocumentText className="size-4" />
                  Text
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem className="flex items-center gap-2">
              <FilePlus className="size-4" />
              New Trail
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem className="flex items-center gap-2">
              <Edit2Icon className="size-4" />
              Rename
            </MenubarItem>

            <MenubarItem className="flex items-center gap-2">
              <TrashIcon className="size-4" />
              Remove
            </MenubarItem>

            <MenubarSeparator />
            <MenubarItem
              className="flex items-center gap-2"
              onClick={() => {
                window.print();
              }}
            >
              <PrinterIcon className="size-4" />
              Print <MenubarShortcut>P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
            Edit
          </MenubarTrigger>

          <MenubarContent className="print:hidden">
            <MenubarItem
              className="flex items-center gap-2"
              onClick={() => editor?.chain().focus().undo().run()}
            >
              <LuUndo className="size-4" />
              Undo <MenubarShortcut>Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              className="flex items-center gap-2"
              onClick={() => editor?.chain().focus().redo().run()}
            >
              <LuRedo className="size-4" />
              Redo <MenubarShortcut>Y</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
            Insert
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
                <Table className="size-4" />
                Table
              </MenubarSubTrigger>
              <MenubarSubContent>
                {/* Quick table size options */}
                {Array.from({ length: 6 }, (_, i) => {
                  const size = i + 1;
                  return (
                    <MenubarItem
                      key={size}
                      className="flex items-center gap-2"
                      onClick={() => insertTable(size, size)}
                    >
                      <span>{size} x {size}</span>
                    </MenubarItem>
                  );
                })}
                
                {/* Custom table size input */}
                <MenubarSub>
                  <MenubarSubTrigger 
                    className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2"
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    Custom
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <div className="flex flex-col gap-2 p-2">
                      <div
                        className="flex items-center gap-2"
                        onClick={handleInputClick}
                      >
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={rows}
                          placeholder="Rows"
                          className="w-16 text-center"
                          onChange={(e) => handleNumericInput(e, setRows)}
                          onPointerDown={(e) => e.stopPropagation()}
                        />
                        <span>×</span>
                        <Input
                          type="number"
                          min="1"
                          max="100"
                          value={cols}
                          placeholder="Cols"
                          className="w-16 text-center"
                          onChange={(e) => handleNumericInput(e, setCols)}
                          onPointerDown={(e) => e.stopPropagation()}
                        />
                      </div>
                      
                      <Button
                        onClick={handleCustomTableInsert}
                        className="w-full"
                        disabled={!rows || !cols || rows < 1 || cols < 1}
                      >
                        Insert Table
                      </Button>
                    </div>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
            Format
          </MenubarTrigger>

          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto flex items-center gap-2">
                <TextIcon className="size-4" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>

                <MenubarItem className="flex items-center gap-1.5"
                onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <HiBold className="size-4" />
                  Bold
                  <MenubarShortcut>B</MenubarShortcut>
                </MenubarItem>

                <MenubarItem className="flex items-center gap-1.5"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    >
                  <PiTextItalicBold className="size-4" />
                  Italic
                  <MenubarShortcut>I</MenubarShortcut>
                </MenubarItem>

                <MenubarItem className="flex items-center gap-1.5"
                
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                >
                  <ImUnderline className="size-4" />
                  Underline
                  <MenubarShortcut>U</MenubarShortcut>
                </MenubarItem>

                <MenubarItem className="flex items-center gap-1.5"
                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <LuStrikethrough className="size-4" />
                  Strikethrough
                  <MenubarShortcut>S</MenubarShortcut>
                </MenubarItem>

              </MenubarSubContent>
              <MenubarItem className="flex items-center gap-1.5"
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
              >
                <RemoveFormattingIcon className="size-4" />
                Clear Formatting
              </MenubarItem>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

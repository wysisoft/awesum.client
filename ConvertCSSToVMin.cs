using System;
using System.IO;
using System.Text.RegularExpressions;

string filePath = Args[0];
string fileContent = File.ReadAllText(filePath);

// Regular expressions for matching px and rem units
string pxRegex = @"(\d*\.?\d+)px";
string remRegex = @"(\d*\.?\d+)rem";
string emRegex = @"(\d*\.?\d+)em";


// Conversion factors assuming iPad resolution (768x1024)
// These factors may need adjustment based on the specific iPad model and orientation
double pxToVminFactor = 100.0 / 1024; // 1px to vmin
double remToVminFactor = 2.5; // Assuming 1rem = 16px


// Replace px with vmin
fileContent = Regex.Replace(fileContent, pxRegex, m =>
    (double.Parse(m.Groups[1].Value) * pxToVminFactor).ToString("0.##") + "vmin");

// Replace rem with vmin
fileContent = Regex.Replace(fileContent, remRegex, m =>
    (double.Parse(m.Groups[1].Value) * remToVminFactor).ToString("0.##") + "vmin");

// Replace em with vmin
fileContent = Regex.Replace(fileContent, emRegex, m =>
    (double.Parse(m.Groups[1].Value) * emToVminFactor).ToString("0.##") + "vmin");


// Write the modified content back to the file or to a new file
File.WriteAllText(filePath, fileContent); // Overwrite the original file
                                          // Or write to a new file: File.WriteAllText("path/to/modified/file.css", fileContent);

const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectSchema,
    feedbackModel } = require('../schema/Project');


const projectSchemaNew = require('../schema/Project')

function ConvertTimesheetFormat(timesheet){
    formatted_timesheet = {};
    let i = 0;
    for (let i = 0;i<timesheet.length;i++){
        formatted_timesheet[timesheet[i].UID] = timesheet[i];
    }

    return (formatted_timesheet);
}

async function RetreiveProjectName(projects) {
    try {
        const formattedProjectNames = await projectSchemaNew.find({ projectId: { $in: projects.map(proj => proj.projectId) } })
            .select('projectId projectName') // Include only necessary fields in the result
            .populate('projectId', 'projectName'); // Populate the projectId field with the projectName

        const result = formattedProjectNames.map(project => ({
            projectId: project.projectId,
            projectName: project.projectName || 'not found' // Default value if projectName is not available
        }));

        console.log("Array of projects with names:", result);
        return result;
    } catch (error) {
        console.error('Error retrieving project names:', error);
        return [];
    }
}

// async function RetreiveProjectName(projects) {
//     console.log("hi")
//     const formattedProjectNames = []; 

//     console.log(projects)

//     console.log(projectSchema)
//     // return [];
//     for (let i = 0; i < projects.length; i++) {
//         try {
//             const projectId =  projects[i].projectId;
//             console.log("rpojectI", projectId)

//             if(typeof projectId === 'undefined') continue;

//             const project = await projectSchemaNew.findOne({ projectId: projectId });
//             if (project) {
//                 formattedProjectNames.push({projectId:projectId});
//             } else {
//                 // Handle case where project with given projectId is not found
//                 formattedProjectNames.push({projectId:"not found"});
//             }
//         } catch (error) {
//             // Handle error in case of any issues with the findOne operation
//             console.error(`Error retrieving project with projectId ${projects[i].projectId}:`, error);
//             formattedProjectNames[projects[i].projectId] = "Error retrieving project";
//         }
//     }

//     console.log("array",formattedProjectNames);
//     return formattedProjectNames;
// }


module.exports = {
    ConvertTimesheetFormat,
    RetreiveProjectName
}
const { UserModel,
    projectAssignmentModel,
    timesheetModel,
    projectSchema,
    feedbackModel } = require('../schema/Project');

function ConvertTimesheetFormat(timesheet){
    formatted_timesheet = {};
    let i = 0;
    for (let i = 0;i<timesheet.length;i++){
        formatted_timesheet[timesheet[i].UID] = timesheet[i];
    }

    return (formatted_timesheet);
}

async function RetreiveProjectName(projects) {
    const formattedProjectNames = [];

    for (let i = 0; i < projects.length; i++) {
        try {
            const projectId =  projects[i].projectId;
            const project = await projectSchema.findOne({ projectId: projectId });
            if (project) {
                formattedProjectNames.push({projectId:projectId,name:project.name});
            } else {
                // Handle case where project with given projectId is not found
                formattedProjectNames.push({projectId:"not found"});
            }
        } catch (error) {
            // Handle error in case of any issues with the findOne operation
            console.error(`Error retrieving project with projectId ${projects[i].projectId}:`, error);
            formattedProjectNames[projects[i].projectId] = "Error retrieving project";
        }
    }

    console.log(formattedProjectNames);
    return formattedProjectNames;
}


module.exports = {
    ConvertTimesheetFormat,
    RetreiveProjectName
}
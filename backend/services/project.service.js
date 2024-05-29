/*  backend/services/project.service.js
 *	2024 © Atlaspad Launchpad
 *  Yigid BALABAN <fyb@fybx.dev>
 */

const { Project } = require('../models/index');

class ProjectService {
	async createProject(data) {
		return await Project.create({ ...data });
	}

	async getProjects() {
		const allProjects = await Project.find({}).lean().select('-__v -updatedAt');
		return allProjects;
	}

	async getProject(projectId) {
		const project = await Project.findOne({ projectId: projectId })
			.lean()
			.select('-__v -updatedAt');
		return project;
	}
}

module.exports = ProjectService;

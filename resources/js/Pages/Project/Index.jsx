import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP } from "@/constants";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";

export default function Index({auth, projects, queryParams = null}){
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }
    }
    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChanged(name, e.target.value);
    }



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>}
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        
                                        <tr className="text-nowrap">
                                            <th scope="col" className="px-3 py-3">ID</th>
                                            <th scope="col" className="px-3 py-3">Image</th>
                                            <th scope="col" className="px-3 py-3">Name</th>
                                            <th scope="col" className="px-3 py-3">Status</th>
                                            <th scope="col" className="px-3 py-3">Create Date</th>
                                            <th scope="col" className="px-3 py-3">Due Date</th>
                                            <th scope="col" className="px-3 py-3">Crated By</th>
                                            <th scope="col" className="px-3 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr>
                                            <th scope="col" className="px-3 py-3"></th>
                                            <th scope="col" className="px-3 py-3"></th>
                                            <th scope="col" className="px-3 py-3">
                                                <TextInput 
                                                    className="w-full"
                                                    placeholder="Project name..."
                                                    onBlur={e => searchFieldChanged('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th scope="col" className="px-3 py-3">
                                                <SelectInput 
                                                    className="w-full"
                                                    onChange={(e) =>
                                                        searchFieldChanged("status", e.target.value)
                                                    }
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                            </th>
                                            <th scope="col" className="px-3 py-3"></th>
                                            <th scope="col" className="px-3 py-3"></th>
                                            <th scope="col" className="px-3 py-3"></th>
                                            <th scope="col" className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project)=>(
                                            <tr className="border-b border-gray-200 dark:border-gray-700" key={project.id}>
                                                <th className="px-3 py-2">{project.id}</th>
                                                <td className="px-3 py-2"><img src={project.image_path} width="60"/></td>
                                                <td className="px-3 py-2">{project.name}</td>
                                                <td className="px-3 py-2">
                                                    <span className={"px-2 py-1 rounded text-white " +
                                                        PROJECT_STATUS_CLASS_MAP[project.status]
                                                     }>{PROJECT_STATUS_TEXT_MAP[project.status]} </span>
                                                </td>
                                                <td className="px-3 py-2">{project.created_at}</td>
                                                <td className="px-3 py-2">{project.due_date}</td>
                                                <td className="px-3 py-2">{project.createdBy.name}</td>
                                                <td className="px-3 py-2">
                                                    <Link href={route('project.edit', project.id)} className="font-medium text-green-600 dark:text-green-400 hover:underline mx-1">Edit</Link>
                                                    <Link href={route('project.edit', project.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline mx-1">Delete</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={projects.meta.links} />
                            </div>

                            <pre>{JSON.stringify(projects, undefined, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}